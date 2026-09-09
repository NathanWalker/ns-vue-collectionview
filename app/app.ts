import { createApp } from 'nativescript-vue'
import CollectionView from '@nativescript-community/ui-collectionview/vue3'

import Home from './components/Home.vue'

const app = createApp(Home)
app.use(CollectionView)
app.start()
