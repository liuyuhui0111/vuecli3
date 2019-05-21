import {
  mapGetters,
  mapMutations,
} from 'vuex';
import Title from '@/views/web/center/title.vue';

export default {
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters([
      // 映射 this.count 为 store.state.count
      'commonCenterData', // 用户相关信息
    ]),
  },
  methods: {
    ...mapMutations('center', [
      'setCenterData',
    ]),
  },
  components: {
    Title,
  },
};
