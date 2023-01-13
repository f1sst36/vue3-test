import { createApp } from 'vue'
import App from './App.vue'
import components from '@/components/ui';

const app = createApp(App)

for(const component of components) {
    app.component(component.name, component)
}

app.mount('#app')
