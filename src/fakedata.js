export function genFriend() {
  const people = []
  for (let i = 0; i < 20; i++) {
    people.push({
      name: "Dung "+i,
      url: "https://images.contentstack.io/v3/assets/blt187521ff0727be24/blt41c476486b063ef8/60ee13df31f9ee2ab08a4dfe/Yasuo_0.jpg"
    })
  }
  return people
}
