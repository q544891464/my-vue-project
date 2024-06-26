import { createApp, reactive, computed } from 'vue';
import { getSkinValue } from './tools';

window.noticeRefresh = (val) => {
  if (val === 1) {
    location.reload();
  }
};

const ua = navigator.userAgent;

const envData = reactive({
  skinType: getSkinValue('skinType')
    ? Number(getSkinValue('skinType')) === 1
      ? 'black'
      : 'white'
    : 'white', // 1黑暗模式,
  theme: 'system' // system 、light、 dark主题色
});

const env = {
  data: envData,
  computed: {
    isAccessibleLocation: computed(() => {
      const regex = new RegExp(
        [
          '/protocol/service',
          '/protocol/privacy',
          '/captacha',
          '/help/robot'
        ].join('|')
      );
      return regex.test(window.location.href);
    }),
    isExternalLink: computed(() => {
      const regex = new RegExp(
        ['/meetingBooking/meetingBookingDetail'].join('|')
      );
      return regex.test(window.location.href);
    }),
    isAndroid: computed(() => {
      return /android/i.test(ua) && !env.computed.isLocal.value;
    }),
    isIos: computed(() => {
      return /(ipad)|(iphone)/i.test(ua) && !env.computed.isLocal.value;
    }),
    isApp: computed(() => {
      return (env.computed.isAndroid.value || env.computed.isIos.value) && !env.computed.isLocal.value;
    }),
    isLocal: computed(() => {
      return true;
      // return (
      //   getUrlParam('local') ||
      //   (process.env.PROJECT_ENV && process.env.PROJECT_ENV === 'local')
      // );
    }),
    skinWhite: computed(() => {
      return envData.skinType === 'white';
    }),
    skinBlack: computed(() => {
      return envData.skinType === 'black';
    })
  },
  methods: {}
};

const app = createApp({
  data() {
    return envData;
  },
  computed: env.computed,
  methods: env.methods
});

export default app;
