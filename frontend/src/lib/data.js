export const FilterType = {
  all: "all tasks",
  active: "in progress",
  completed: "completed",
};

export const options = [
    {
        value: "today",
        label: "Today",
    },
    {
        value: "week",
        label: "This week",
    },
    {
        value: "month",
        label: "This month"
    },
    {
        value: "all",
        label: "All tasks",
    }
];

export const visibleTaskLimit = 4;
