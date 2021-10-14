app.component("product-display", {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },
  template:
    /*html*/
    `
    <div class="product-display">
      <div class="product-container">
        <div class="product-image">       
          <img
            v-bind:src="image"
            :class="{ 'out-of-stock-img': !inStock }"
            alt="socks!"
          />
        </div>

        <div class="product-info">
          <h1>{{ title }}</h1>
          <p>{{ sale }}</p>
          <p v-if="inStock">In Stock</p>
          <p v-else>Out of Stock</p>
          <p>Shipping: {{ shipping }}</p>
          <product-details :details="details"></product-details>
          <p>{{ description }}</p>
          <div
            v-for="(variant, index) in variants"
            :key="variant.id"
            @mouseover="updateVariant(index)"
            class="color-circle"
            :style="{ backgroundColor: variant.color}"
          ></div>
          <button
              class="button"
              :class="{ disabledButton: !inStock}"
              :disabled=" !inStock"
              @click="addToCart"
            >
              Add to Cart
            </button>
        </div>
      </div>
          
      <review-list v-if="reviews.length" :reviews="reviews"></review-list>
      <review-form @review-submitted="addReview"></review-form>
    </div>
        
       
        `,
  data() {
    return {
      product: "Socks",
      brand: "Vue Mastery",
      description: "Keep your feet warm and dry",
      selectedVariant: 0,
      url: "https://press.stripe.com/",
      onSale: true,
      variants: [
        {
          id: 2234,
          color: "green",
          image: "./assets/images/socks_green.jpg",
          quantity: 15,
        },
        {
          id: 2235,
          color: "blue",
          image: "./assets/images/socks_blue.jpg",
          quantity: 2,
        },
      ],
      reviews: [],
    };
  },
  methods: {
    addToCart() {
      // this.cart += 1;
      this.$emit("add-to-cart", this.variants[this.selectedVariant].id);
    },
    removeItem() {
      this.$emit("remove-from-cart", this.variants[this.selectedVariant].id);
    },
    updateVariant(index) {
      this.selectedVariant = index;
    },
    addReview(review) {
      this.reviews.push(review);
    },
  },
  computed: {
    title() {
      return this.brand + " " + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].image;
    },
    inStock() {
      return this.variants[this.selectedVariant].quantity;
    },
    sale() {
      if (this.onSale) {
        return this.brand + " " + this.product + " on sale now!";
      }
      return "";
    },
    shipping() {
      if (this.premium) {
        return "Free";
      }
      return 2.99;
    },
  },
});
