
Post.destroy_all
User.destroy_all

user1 = User.create!(
  name: "tester",
  email: "tester@example.com",
  password: "password123",
  password_confirmation: "password123"
)

user2 = User.create!(
  name: "daser",
  email: "daser@example.com",
  password: "password456",
  password_confirmation: "password456"
)

Post.create!([
  { title: "Hello World", body: "This is my first post!", user: user1 },
  { title: "Another Day", body: "Just sharing some thoughts...", user: user1 }
])

Post.create!([
  { title: "Greetings!", body: "Excited to join this platform!", user: user2 }
])

puts "✅ Seeded #{User.count} users and #{Post.count} posts"
