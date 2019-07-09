import { t } from '~/vendor/el-common/locale';

export default {
  methods: {
    t(...args) {
      return t.apply(this, args);
    }
  }
};
