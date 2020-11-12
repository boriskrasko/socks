Vue.component('product', {
	props: {
		premium: {
			type: Boolean,
			requared: true
		},
	},
	template: `
		<div class="product row">

        	<div class="product-image col-lg-6">
        		<img :src="image" :title="description" :alt="description">
        	</div>

        	<div class="product-info col-lg-6">
        		<h2>{{product}}</h2>
        		<p>Shipping: {{shipping}}</p>
        		<p>inStock: ({{inStock}})</p>
        		<p :style="{color: 'green'}" v-if="inStock > 10">In Stock</p>
        		<p :style="{color: 'orange'}" v-else-if="inStock <= 10 && inStock > 0">Almost sold out!</p>
        		<p :style="{color: 'red'}" v-else>Out of Stock</p>
        		<span :style="{color: '#f01'}" v-show="onSale">ON SALE!</span>
        		<ul>
        			<li v-for="detail in details">{{detail}}</li>
        		</ul>
        		<div :style="{backgroundColor: variant.variantColorHex}" class="select-color color-box" v-for="(variant, index) in  variants" :key="variant.variantId" @mouseover="updateProduct(index)"> 
        			<!--<p>{{variant.variantColor}}</p>-->
        		</div>
        		<ul>
        			<li v-for="size in sizes">{{size}}</li>
        		</ul>
        		<div class="cart">
        			<img src="img/shopping-cart.png" alt="">
        			<p :style="{float: 'right', marginLeft: '10px'}">
        				({{this.variants[this.selectedVariant].soldQuantity}})
        			</p>
        		</div>
        		<button :disabled="inStock < 1" class="btn btn-primary" v-on:click="addToCart">
        			Add to cart
        		</button>
        		<button class="btn btn-secondary" v-on:click="removeFromCart">
        			Remove from cart
        		</button>
        		<button class="btn btn-warning" v-on:click="resetCart">
        			Reset cart
        		</button>
        	</div>

        </div>
	`,
	data() {
		return {
		description: "A pair of warm, fuzzy socks",
		product: "Socks",
		// image: "img/cashmeresocks_alabaster__hero-alt.jpg",
		// inStock: true,
		// inventory: 20,
		onSale: true,
		details: ['95% cotton', '5% polyester', 'Gender-neutral'],
		sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
		selectedVariant: 0,
		variants: [
			{
				variantId: 2234,
				variantColor: 'Alabaster',
				variantImage: 'img/cashmeresocks_alabaster__hero-alt.jpg',
				variantColorHex: '#f2f0e6',
				variantQuantity: 6,
				soldQuantity: 0
			},
			{
				variantId: 2235,
				variantColor: 'Cabernet',
				variantImage: 'img/cashmeresocks_cabernet__hero-alt.jpg',
				variantColorHex: '#280008',
				variantQuantity: 14,
				soldQuantity: 0
			},
			{
				variantId: 2236,
				variantColor: 'Black',
				variantImage: 'img/cashmeresocks_black__hero-alt.jpg',
				variantColorHex: '#111111',
				variantQuantity: 2,
				soldQuantity: 0
			},
			{
				variantId: 2237,
				variantColor: 'Huntergreen',
				variantImage: 'img/cashmeresocks_huntergreen__hero-alt.jpg',
				variantColorHex: '#355e3b',
				variantQuantity: 0,
				soldQuantity: 0
			},
			{
				variantId: 2238,
				variantColor: 'Vanilla',
				variantImage: 'img/cashmeresocks-vanilla_updated.jpg',
				variantColorHex: '#f3e5ab',
				variantQuantity: 12,
				soldQuantity: 0
			}

		],
		cart: 0,
		}
	},
	methods: {
		addToCart() {
			if (this.variants[this.selectedVariant].variantQuantity !=0) {
				this.variants[this.selectedVariant].soldQuantity +=1,
				this.variants[this.selectedVariant].variantQuantity -=1;
			}
		},
		removeFromCart() {
			if (this.variants[this.selectedVariant].soldQuantity != 0 ){
				this.variants[this.selectedVariant].soldQuantity -=1,
				this.variants[this.selectedVariant].variantQuantity +=1;
			}
		},
		resetCart() {
			this.cart = 0;
		},
		updateProduct(index) {
			this.selectedVariant = index;
			console.log(index);
		}
	},
	computed: {   //вычисляемые свойства
		name() {
			return this.brand + ' ' + this.product;
		},
		image() {
			return this.variants[this.selectedVariant].variantImage;
		},
		inStock() {
			return this.variants[this.selectedVariant].variantQuantity;
		},
		shipping() {
			if (this.premium) {
				return "Free";
			} else {
				return 2.99
			}
		}
	}
})

Vue.component('warm', {
	template:`
		<div class="product row">

        	<div class="product-image col-lg-6">
        		<img :src="image" :title="description" :alt="description">
        	</div>

        	<div class="product-info col-lg-6">
        		<h2>{{product}}</h2>
        		<p>Shipping: {{shipping}}</p>
        		<p>inStock: ({{inStock}})</p>
        		<p :style="{color: 'green'}" v-if="inStock > 10">In Stock</p>
        		<p :style="{color: 'orange'}" v-else-if="inStock <= 10 && inStock > 0">Almost sold out!</p>
        		<p :style="{color: 'red'}" v-else>Out of Stock</p>
        		<span :style="{color: '#f01'}" v-show="onSale">ON SALE!</span>
        		<ul>
        			<li v-for="detail in details">{{detail}}</li>
        		</ul>
        		<div :style="{backgroundColor: variant.variantColorHex}" class="select-color color-box" v-for="(variant, index) in  variants" :key="variant.variantId" @mouseover="updateProduct(index)"> 
        			<!--<p>{{variant.variantColor}}</p>-->
        		</div>
        		<ul>
        			<li v-for="size in sizes">{{size}}</li>
        		</ul>
        		<div class="cart">
        			<img src="img/shopping-cart.png" alt="">
        			<p :style="{float: 'right', marginLeft: '10px'}">
        				({{this.variants[this.selectedVariant].soldQuantity}})
        			</p>
        		</div>
        		<button :disabled="inStock < 1" class="btn btn-primary" v-on:click="addToCart">
        			Add to cart
        		</button>
        		<button class="btn btn-secondary" v-on:click="removeFromCart">
        			Remove from cart
        		</button>
        		<button class="btn btn-warning" v-on:click="resetCart">
        			Reset cart
        		</button>
        	</div>

        </div>
	`,
		data() {
		return {
		description: "A pair of warm, fuzzy socks",
		product: "Socks",
		// image: "img/cashmeresocks_alabaster__hero-alt.jpg",
		// inStock: true,
		// inventory: 20,
		details: ['100% sheep wool', 'Gender-neutral'],
		sizes: ['S', 'M', 'L', 'XL', 'XXL',],
		selectedVariant: 0,
		variants: [
			{
				variantId: 2291,
				variantColor: 'Gray',
				variantImage: 'img/warm-gray.jpg',
				variantColorHex: '#aa9',
				variantQuantity: 12,
				soldQuantity: 0
			},
			{
				variantId: 2292,
				variantColor: 'White',
				variantImage: 'img/warm-white.jpg',
				variantColorHex: '#ddd',
				variantQuantity: 6,
				soldQuantity: 0
			}

		],
		cart: 0,
		}
	},
	methods: {
		addToCart() {
			if (this.variants[this.selectedVariant].variantQuantity !=0) {
				this.variants[this.selectedVariant].soldQuantity +=1,
				this.variants[this.selectedVariant].variantQuantity -=1;
			}
		},
		removeFromCart() {
			if (this.variants[this.selectedVariant].soldQuantity != 0 ){
				this.variants[this.selectedVariant].soldQuantity -=1,
				this.variants[this.selectedVariant].variantQuantity +=1;
			}
		},
		resetCart() {
			this.cart = 0;
		},
		updateProduct(index) {
			this.selectedVariant = index;
			console.log(index);
		}
	},
	computed: {   //вычисляемые свойства
		name() {
			return this.brand + ' ' + this.product;
		},
		image() {
			return this.variants[this.selectedVariant].variantImage;
		},
		inStock() {
			return this.variants[this.selectedVariant].variantQuantity;
		},
		shipping() {
			if (this.premium) {
				return "Free";
			} else {
				return 2.99
			}
		}
	}

})

Vue.component('product2', {
	props: {
		premium: {
			type: Boolean,
			requared: true
		},
	},
	template: `
		<div class="product row">

        	<div class="product-image col-lg-6">
        		<img :src="image" :title="description" :alt="description">
        	</div>

        	<div class="product-info col-lg-6">
        		<h2>{{product}}</h2>
        		<p>Shipping: {{shipping}}</p>
        		<p>inStock: ({{inStock}})</p>
        		<p :style="{color: 'green'}" v-if="inStock > 10">In Stock</p>
        		<p :style="{color: 'orange'}" v-else-if="inStock <= 10 && inStock > 0">Almost sold out!</p>
        		<p :style="{color: 'red'}" v-else>Out of Stock</p>
        		<span :style="{color: '#f01'}" v-show="onSale">ON SALE!</span>
        		<ul>
        			<li v-for="detail in details">{{detail}}</li>
        		</ul>
        		<div :style="{backgroundColor: variant.variantColorHex}" class="select-color color-box" v-for="(variant, index) in  variants" :key="variant.variantId" @mouseover="updateProduct(index)"> 
        			<!--<p>{{variant.variantColor}}</p>-->
        		</div>
        		<ul>
        			<li v-for="size in sizes">{{size}}</li>
        		</ul>
        		<div class="cart">
        			<img src="img/shopping-cart.png" alt="">
        			<p :style="{float: 'right', marginLeft: '10px'}">
        				({{this.variants[this.selectedVariant].soldQuantity}})
        			</p>
        		</div>
        		<button :disabled="inStock < 1" class="btn btn-primary" v-on:click="addToCart">
        			Add to cart
        		</button>
        		<button class="btn btn-secondary" v-on:click="removeFromCart">
        			Remove from cart
        		</button>
        		<button class="btn btn-warning" v-on:click="resetCart">
        			Reset cart
        		</button>
        	</div>

        </div>
	`,
	data() {
		return {
		description: "A pair of warm, fuzzy socks",
		product: "Socks",
		// image: "img/cashmeresocks_alabaster__hero-alt.jpg",
		// inStock: true,
		// inventory: 20,
		onSale: true,
		details: ['95% cotton', '5% polyester', 'Gender-neutral'],
		sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
		selectedVariant: 0,
		variants: [
			{
				variantId: 2235,
				variantColor: 'Cabernet',
				variantImage: 'img/cashmeresocks_cabernet__hero-alt.jpg',
				variantColorHex: '#280008',
				variantQuantity: 14,
				soldQuantity: 0
			},
			{
				variantId: 2236,
				variantColor: 'Black',
				variantImage: 'img/cashmeresocks_black__hero-alt.jpg',
				variantColorHex: '#111111',
				variantQuantity: 2,
				soldQuantity: 0
			},
			{
				variantId: 2237,
				variantColor: 'Huntergreen',
				variantImage: 'img/cashmeresocks_huntergreen__hero-alt.jpg',
				variantColorHex: '#355e3b',
				variantQuantity: 0,
				soldQuantity: 0
			},
			{
				variantId: 2238,
				variantColor: 'Vanilla',
				variantImage: 'img/cashmeresocks-vanilla_updated.jpg',
				variantColorHex: '#f3e5ab',
				variantQuantity: 12,
				soldQuantity: 0
			}

		],
		cart: 0,
		}
	},
	methods: {
		addToCart() {
			if (this.variants[this.selectedVariant].variantQuantity !=0) {
				this.variants[this.selectedVariant].soldQuantity +=1,
				this.variants[this.selectedVariant].variantQuantity -=1;
			}
		},
		removeFromCart() {
			if (this.variants[this.selectedVariant].soldQuantity != 0 ){
				this.variants[this.selectedVariant].soldQuantity -=1,
				this.variants[this.selectedVariant].variantQuantity +=1;
			}
		},
		resetCart() {
			this.cart = 0;
		},
		updateProduct(index) {
			this.selectedVariant = index;
			console.log(index);
		}
	},
	computed: {   //вычисляемые свойства
		name() {
			return this.brand + ' ' + this.product;
		},
		image() {
			return this.variants[this.selectedVariant].variantImage;
		},
		inStock() {
			return this.variants[this.selectedVariant].variantQuantity;
		},
		shipping() {
			if (this.premium) {
				return "Free";
			} else {
				return 2.99
			}
		}
	}
})

/* 

Vue.component('product', {
  template: `
  <div class="product">
…
  </div>
  `,
  data() {
    return {
      // тут будут данные
    }
  },
    methods: {
      // тут будут методы
    },
    computed: {
      // тут будут вычисляемые свойства
    }
}) 

*/



// var app = new Vue({options})

var app = new Vue ({
	el: '#app', // Creating communication between Vue instance and DOM
	data: {
		title: "Vasilina", // key - value | ключ - значение
		logo: "img/vasilina-logo.jpg",
		brand: "Vasilina",
		link: "http://vasilina.com",
		more: "More products like this",
		description: "A pair of warm, fuzzy socks",
		premium: true,
	}
})