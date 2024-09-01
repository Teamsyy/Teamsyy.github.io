<script setup>
import { ref, onMounted } from 'vue';

const name = ref('Taspol Thuanchamnan');
const bio = ref('A passionate front-end developer who loves to build web applications using Vue.js');
const socialLinks = ref([
  { name: 'GitHub', url: 'https://github.com/Teamsyy', icon: 'fab fa-github' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/username', icon: 'fab fa-linkedin' },
  { name: 'Twitter', url: 'https://twitter.com/username', icon: 'fab fa-twitter' }
]);

const aboutSection = ref(null);
const projectsSection = ref(null);
const contactSection = ref(null);

const scrollToSection = (sectionRef) => {
  if (sectionRef) {
    console.log('Scrolling to section:', sectionRef);
    sectionRef.scrollIntoView({ behavior: 'smooth' });
  } else {
    console.log('Section reference is null:', sectionRef);
  }
};

onMounted(() => {
  console.log('Sections on mount:', {
    aboutSection: aboutSection.value,
    projectsSection: projectsSection.value,
    contactSection: contactSection.value,
  });
});
</script>

<template>
  <div class="flex h-screen bg-gray-900 text-gray-200">
    <nav class="w-1/6 bg-gray-800 p-4 text-white">
      <ul class="space-y-4">
        <li><button @click="scrollToSection(aboutSection)" class="nav-button">About</button></li>
        <li><button @click="scrollToSection(projectsSection)" class="nav-button">Projects</button></li>
        <li><button @click="scrollToSection(contactSection)" class="nav-button">Contact</button></li>
      </ul>
    </nav>
    <div class="w-5/6 p-6 overflow-y-auto">
      <section ref="aboutSection" class="mb-8 h-screen flex flex-col justify-center">
        <h1 class="text-5xl font-bold mb-4">{{ name }}</h1>
        <p class="text-xl text-gray-400 mb-6">{{ bio }}</p>
        <div class="flex space-x-4">
          <a v-for="link in socialLinks" :key="link.name" :href="link.url" target="_blank" class="text-gray-400 hover:text-blue-500">
            <i :class="link.icon" class="text-3xl"></i>
          </a>
        </div>
      </section>
      <section ref="projectsSection" class="mb-8 h-screen flex flex-col justify-center">
        <h2 class="text-4xl font-bold mb-4">Projects</h2>
        <p class="text-xl text-gray-400">Details about projects...</p>
      </section>
      <section ref="contactSection" class="mb-8 h-screen flex flex-col justify-center">
        <h2 class="text-4xl font-bold mb-4">Contact</h2>
        <p class="text-xl text-gray-400">Contact information...</p>
      </section>
    </div>
  </div>
</template>

<style scoped>
@import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';

body {
  background-color: #1a1a1a;
  color: #e0e0e0;
}

nav {
  background-color: #2a2a2a;
}

button.nav-button {
  color: #e0e0e0;
  border: 2px solid #4a4a4a;
  padding: 8px 16px;
  border-radius: 4px;
  transition: border-color 0.3s, color 0.3s;
}

button.nav-button:hover {
  color: #ffffff;
  border-color: #1e90ff;
}

a {
  color: #e0e0e0;
}

a:hover {
  color: #1e90ff;
}
</style>