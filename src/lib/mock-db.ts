type UserActivity = {
  id: string;
  userId: string;
  action: string;
  timestamp: Date;
};

class MockDB {
  private activities: UserActivity[] = [];

  async createUserActivity(data: Omit<UserActivity, 'id'>) {
    const newActivity = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
    };
    this.activities.push(newActivity);
    return newActivity;
  }

  async getUserActivities() {
    return this.activities;
  }
}

export const db = new MockDB();

