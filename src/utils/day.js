import Vue from "vue";
import dayjs from "dayjs"; // ES 2015

export function formatDate(date) {
  return dayjs(date).format("YYYY-MM-DD");
}
