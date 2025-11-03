import Task from "../models/Tasks.js";

export const getAllTasks = async (req, res) => {
  const { filter = "today" } = req.query;
  const now = new Date();
  let startDate;

  switch (filter) {
    case "today": {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // 2025-11-1 00:00
      break;
    }
    case "week": {
      const mondayDate =
        now.getDate() - (now.getDay() - 1) - (now.getDay === 0 ? 7 : 0);
      startDate = new Date(now.getFullYear(), now.getMonth(), mondayDate);
      break;
    }
    case "month": {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    }
    case "all":
    default: {
      startDate = null;
    }
  }

  const query = startDate ? { createdAt: { $gte: startDate } } : {};

  try {
    const result = await Task.aggregate([
      // aggregation pipelines (mongoDB), a better way to control data
      { $match: query },
      {
        $facet: {
          // $facet - aggregation stage (run parallel processing, and return 1 result(whole pipeline) --> faster)
          tasks: [{ $sort: { createdAt: -1 } }],
          activeCount: [{ $match: { status: "active" } }, { $count: "count" }], // filter ($match similar to find()) status 'active' then count it
          completeCount: [
            { $match: { status: "complete" } },
            { $count: "count" },
          ],
        },
      },
    ]);

    const tasks = result[0].tasks;
    const activeCount = result[0].activeCount[0]?.count || 0;
    const completeCount = result[0].completeCount[0]?.count || 0;

    res.status(200).json({ tasks, activeCount, completeCount });
  } catch (error) {
    console.error("Fail when call getAllTasks", error);
    res.status(500).json({ message: "System error" });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title } = req.body;
    const task = new Task({ title });

    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Fail when call createTask", error);
    res.status(500).json({ message: "System error" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, status, completedAt } = req.body;
    const updateTask = await Task.findByIdAndUpdate(
      req.params.id, // take id from url
      {
        title,
        status,
        completedAt,
      },
      { new: true }
    );

    if (!updateTask) {
      return res.status(404).json({ message: "Task not exists" });
    }

    res.status(200).json(updateTask);
  } catch (error) {
    console.error("Fail when call updateTask", error);
    res.status(500).json({ message: "System error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deleteTask = await Task.findByIdAndDelete(req.params.id);

    if (!deleteTask) {
      return res.status(404).json({ message: "Task not exists" });
    }

    res.status(200).json(deleteTask);
  } catch (error) {
    console.error("Fail when call deleteTask", error);
    res.status(500).json({ message: "System error" });
  }
};
