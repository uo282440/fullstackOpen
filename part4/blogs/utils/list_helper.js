const dummy = (blogs) => {
  return 1
}

const totalLikes = (list) => {
    let total = 0
    for (let i = 0; i < list.length; i++) {
        total += list[i].likes
    }
    return total
}

const favouriteBlog = (list) => {
    let likes = 0
    let favourite = null

    for (let i = 0; i < list.length; i++) {

        if (list[i].likes > likes) {
            likes = list[i].likes
            favourite = list[i]
        }
    }

    return favourite
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}