import { reactive } from "vue";
import { startOfToday, startOfWeek, endOfWeek, add } from 'date-fns';

const store = reactive({
   selectedWeekStart: startOfWeek(startOfToday(), { weekStartsOn: 1 }),
   selectedWeekEnd: endOfWeek(startOfToday(), { weekStartsOn: 1 }),

   getPreviousDate() {
      store.selectedWeekStart = add(store.selectedWeekStart, { weeks: -1 });
      store.selectedWeekEnd = add(store.selectedWeekEnd, { weeks: -1 });
   },

   getNextDate() {
      store.selectedWeekStart = add(store.selectedWeekStart, { weeks: 1 });
      store.selectedWeekEnd = add(store.selectedWeekEnd, { weeks: 1 });
   }
});

export default store;