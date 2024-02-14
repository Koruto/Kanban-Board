export default interface TaskItem {
  id: string;
  task: string;
  assignee: string;
  status: string;

  due_date: string;
  unique_id: string;

  user_id: string;
  username: string;
  description: string;
}
