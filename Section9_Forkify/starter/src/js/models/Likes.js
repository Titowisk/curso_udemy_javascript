export default class Likes {
    constructor() {
        this.likes = [];
    }

    addLike(id, title, author, img) {
        const like = { id, title, author, img};
        this.likes.push(like);
        return like;
    }

    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index, 1);
    }

    isLiked(id) {
        // this method checks if the recipe is in the likes array
        // this will be used in the UI in the like button heart shapped
        return this.likes.findIndex(el => el.id === id) !== -1;
        // the method findIndex returns -1 if the condition for all elements are false.
    }

    getNumLikes() {
        return this.likes.length;
    }
}