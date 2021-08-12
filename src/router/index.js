import Vue from 'vue';
import VueRouter from 'vue-router';

const DiscoverMusic = () => import('@/views/discover/DiscoverMusic');
const MusicListDetail = () => import('views/musicListDetail/MusicListDetail');
const SearchList = () => import('views/search/SearchList');
// const MusicItem = () => import('views/musicListDetail/childComps/MusicItem');
const Individuation = () =>
  import('@/views/discover/childRouter/Individuation');
const Category = () => import('@/views/discover/childRouter/Category');
const Ranklist = () => import('@/views/discover/childRouter/Ranklist');

const Artist = () => import('@/views/discover/childRouter/Artist');
const ArtistDetail = () => import('@/views/ArtistDetail/ArtistDetail');
const ArtistAlbumn = () =>
  import('@/views/ArtistDetail/childRouter/ArtistAlbumn');
const ArtistMv = () => import('@/views/ArtistDetail/childRouter/ArtistMv');
const ArtistDesc = () => import('@/views/ArtistDetail/childRouter/ArtistDesc');
const ArtistSimi = () => import('@/views/ArtistDetail/childRouter/ArtistSimi');

const NewSongs = () => import('@/views/discover/childRouter/NewSongs');
const Musicmv = () => import('@/views/discover/childRouter/Musicmv');
const MvListDetail = () => import('@/views/mvListDetail/MvListDetail');

Vue.use(VueRouter);

const routes = [
  {
    path: '',
    redirect: '/discover',
  },
  {
    path: '/discover',
    component: DiscoverMusic,
    children: [
      {
        path: '/',
        redirect: '/discover/individ',
      },
      {
        path: '/discover/individ',
        component: Individuation,
      },
      {
        path: '/discover/category',
        component: Category,
      },
      {
        path: '/discover/ranklist',
        component: Ranklist,
      },
      {
        path: '/discover/artist',
        component: Artist,
      },
      {
        path: '/discover/newsongs',
        component: NewSongs,
      },
      {
        path: '/discover/mv',
        component: Musicmv,
      },
    ],
  },
  {
    path: '/musiclistdetail/:id/:time',
    name: 'detail',
    component: MusicListDetail,
  },
  {
    path: '/search/:key',
    component: SearchList,
  },
  {
    path: '/artist',
    component: ArtistDetail,
    children: [
      {
        path: '/',
        redirect: '/artist/albumn',
      },
      {
        path: '/artist/albumn',
        component: ArtistAlbumn,
      },
      {
        path: '/artist/mv',
        component: ArtistMv,
      },
      {
        path: '/artist/desc',
        component: ArtistDesc,
      },
      {
        path: '/artist/simi',
        component: ArtistSimi,
      },
    ],
  },
  {
    path: '/mvlistdetail/:id/:time',
    name: 'detail',
    component: MvListDetail,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
