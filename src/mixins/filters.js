import dayjs from "dayjs";
export default {
  filters: {
    $_formatDate: (value) => {
      return dayjs(value).format("DD MMMM");
    },
    $_formatTime: (value) => {
      return dayjs(value).format("HH:mm");
    },
  },
};
