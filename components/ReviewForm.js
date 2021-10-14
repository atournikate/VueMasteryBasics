app.component("review-form", {
  template:
    /*html*/
    `
    <form class="review-form" @submit.prevent="onSubmit" >
    <h3>Leave a Review</h3>
    <label for="name">Name: </label>
    <input id="name" v-model="name">

    <label for="review">Review: </label>
    <textarea id="review" v-model="review"></textarea>

    <label for="rating">Rating: </label>
    <select id="rating" v-model.number="rating">
      <option>5</option>
      <option>4</option>
      <option>3</option>
      <option>2</option>
      <option>1</option>
    </select>

    <input type="submit" class="button" value="Submit">
  </form>
    `,
  data() {
    return {
      name: "",
      review: "",
      rating: null,
    };
  },
  methods: {
    onSubmit() {
      if (this.name === "" || this.review === "" || this.rating === null) {
        alert("Review is incomplete. Please fill out every field.");
        return;
      }
      let productReview = {
        name: this.name,
        review: this.review,
        rating: this.rating,
      };

      console.log(productReview);
      this.$emit("review-submitted", productReview);

      //resets values below
      this.name = "";
      this.review = "";
      this.rating = null;
    },
  },
});
