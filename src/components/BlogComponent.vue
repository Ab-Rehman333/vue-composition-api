
<template>
    <div class="container mt-4">
        <!-- Loading indicator -->
        <div v-if="loading" class="text-center mb-4">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

        <!-- Form to create a new post -->
        <form @submit.prevent="createPost" class="mb-4">
            <div class="mb-3">
                <label for="newPostTitle" class="form-label">Title:</label>
                <input v-model="newPost.title" class="form-control" id="newPostTitle" required />
            </div>
            <div class="mb-3">
                <label for="newPostBody" class="form-label">Body:</label>
                <textarea v-model="newPost.body" class="form-control" id="newPostBody" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Create Post</button>
        </form>

        <!-- Display existing posts -->
        <div v-for="post in posts" :key="post.id" class="mb-4">
            <div v-if="!post.isEditing">
                <!-- Card view -->
                <div class="card">
                    <div class="card-body">
                        <h2 class="card-title">{{ post.title }}</h2>
                        <p class="card-text">{{ post.body }}</p>
                        <div class="buttons d-flex  gap-3">
                            <font-awesome-icon :icon="['fas', 'comments']" @click="loadComments(post.id)"
                                class="text-primary cursor-pointer" style="cursor: pointer;" />
                            <font-awesome-icon :icon="['fas', 'edit']" @click="editPost(post)" class="text-warning"
                                style="cursor: pointer;" />
                            <font-awesome-icon :icon="['fas', 'trash']" @click="deletePost(post.id)" class="text-danger"
                                style="cursor: pointer;" />
                        </div>
                    </div>
                </div>
            </div>
            <!-- Form to update a post -->
            <form v-if="post.isEditing" @submit.prevent="updatePost(post.id)" class="mb-2">

                <div class="mb-3">
                    <label for="updatePostTitle" class="form-label">New Title:</label>
                    <input v-model="post.title" class="form-control" id="updatePostTitle" required />
                </div>
                <div class="mb-3">
                    <label for="updatePostBody" class="form-label">New Body:</label>
                    <textarea v-model="post.body" class="form-control" id="updatePostBody" required></textarea>
                </div>
                <button type="submit" class="btn btn-success">Update Post</button>
            </form>

            <!-- Display comments -->
            <div v-if="post.comments">
                <h3>Comments:</h3>
                <ul class="list-group">
                    <li v-for="comment in post.comments" :key="comment.id" class="list-group-item">
                        <strong>{{ comment.name }}:</strong> {{ comment.body }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
const API_KEY = "Sm4shkQUgJp1--YOKLzxrWZcKZ5rjm350q0owOPCtbM";
const URL = 'https://jsonplaceholder.typicode.com/posts';
const posts = ref([]);
const newPost = ref({
    title: '',
    body: ''
});
const loading = ref(false);
const fetchPosts = async () => {
    loading.value = true;
    const response = await fetch(URL);
    const data = await response.json();
    posts.value = data.map(post => ({ ...post, comments: null })).reverse();
    loading.value = false;
};

const loadComments = async postId => {
    const response = await fetch(`${URL}/${postId}/comments`);
    const comments = await response.json();
    const postIndex = posts.value.findIndex(post => post.id === postId);
    posts.value[postIndex].comments = comments;
};

const createPost = async () => {
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost.value)
    });

    const createdPost = await response.json();
    posts.value.unshift({ ...createdPost, comments: null });
    newPost.value.title = '';
    newPost.value.body = '';
};
const updatePost = async postId => {
    const postToUpdate = posts.value.find(post => post.id === postId);

    const response = await fetch(`${URL}/${postId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postToUpdate)
    });

    if (response.ok) {
        const updatedPost = await response.json();
        const postIndex = posts.value.findIndex(post => post.id === postId);
        posts.value[postIndex] = { ...updatedPost, comments: null, isEditing: false };
    } else {
        console.error('Failed to update post');
    }
};


const deletePost = async postId => {
    const response = await fetch(`${URL}/${postId}`, {
        method: 'DELETE'
    });

    if (response.status === 200) {
        posts.value = posts.value.filter(post => post.id !== postId);
    }
};

const getImage = async () => {
    const response = await fetch(`https://api.unsplash.com/photos/?&client_id=${API_KEY}`);
    const responseData = await response.json();
    if (response.status === 200) {
        console.log(responseData)
    }
};
const editPost = post => {
    const postIndex = posts.value.findIndex(p => p.id === post.id);
    posts.value[postIndex].isEditing = true;
};

onMounted(() => {
    getImage()
    fetchPosts();
})
</script>