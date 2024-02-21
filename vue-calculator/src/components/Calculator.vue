<template>
	<div class="app-container">
		<aside class="sidebar">
			<h1>This is a calculator</h1>
			<p>This is definitely a functioning calculator.</p>
			<div class="link-buttons">
				<router-link to="/" class="link-button">Calculator</router-link>
        		<router-link to="/ContactForm" class="link-button">Contact</router-link>

				<router-view></router-view>
			</div>
		</aside>
	<section class="calculator-section">
		<div class="calculator" @keydown="handleKeyPress">
			<div class="display">{{ input }}</div>
			<div class="buttons">
				<!-- Row 1 -->
				<button @click="append(7)">7</button>
				<button @click="append(8)">8</button>
				<button @click="append(9)">9</button>
				<button @click="multiply">*</button>
				<button @click="clearEntry">Ce</button>

				<!-- Row 2 -->
				<button @click="append(4)">4</button>
				<button @click="append(5)">5</button>
				<button @click="append(6)">6</button>
				<button @click="divide">/</button>
				<button @click="clear">C</button>

				<!-- Row 3 -->
				<button @click="append(1)">1</button>
				<button @click="append(2)">2</button>
				<button @click="append(3)">3</button>
				<button @click="add">+</button>
				<button @click="backspace">←</button>

				<!-- Row 4 -->
				<button @click="append(0)" class="wide">0</button>
				<button @click="append('.')">.</button>
				<button @click="subtract">-</button>
				<button @click="equals">=</button>
			</div>

			<div class="log">
				<div v-for="(entry, index) in log" :key="index">{{ entry }}</div>
			</div>
		</div>
	</section>
	</div>

	<div>
    	<input v-model="expression" placeholder="Enter your expression" />
    	<button @click="handleCalculate">Calculate</button>
    	<div v-if="result !== null">Result: {{ result }}</div>
  	</div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { calculateResult } from '../api/CalculatorHooks.js'; // Adjust the import path as necessary

const input = ref("");
const result = ref("");
const log = ref([]);

const append = (numberOrOperator) => {
  if (input.value === "Error" || result.value.toString() === input.value) {
    input.value = ""; 
  }
  input.value += numberOrOperator;
};

const clear = () => {
  input.value = "";
  result.value = "";
  log.value = [];
};

const clearEntry = () => {
  input.value = "";
};

const backspace = () => {
  input.value = input.value.slice(0, -1);
};

const equals = async () => {
  try {
	console.log(input.value);
    const response = await calculateResult({ expression: input.value });
    result.value = response.result;
    log.value.push(`${input.value} = ${result.value}`);
    input.value = result.value.toString();
  } catch (error) {
    input.value = "Error";
    console.error("Error performing calculation:", error);
  }
};

const handleKeyPress = (event) => {
  const keyMap = {
    "0": "0", "1": "1", "2": "2", "3": "3", "4": "4",
    "5": "5", "6": "6", "7": "7", "8": "8", "9": "9",
    "+": "+", "-": "-", "*": "*", "/": "/", ".": ".",
  };
  const actionMap = {
    "Enter": equals,
    "Backspace": backspace,
  };
  if (keyMap[event.key]) {
    append(keyMap[event.key]);
  } else if (actionMap[event.key]) {
    actionMap[event.key]();
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeyPress);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeyPress);
});
</script>


<style scoped>
.app-container {
  display: grid;
  grid-template-columns: 1fr 2fr; 
  height: 100vh; 
}

.sidebar {
  /* Keep your width, padding, and border styles */
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; /* Align content to the left */
  height:100vh;
  text-align: left;	
}

.sidebar h1{
	text-align: left;
}
.sidebar p {
  text-align: left; /* Align text to the left */
  margin: 0; /* Remove default margins if necessary */
}

.link-buttons {
	display: flex;
	justify-content: center;
	align-items: center;
}
.link-button {
  margin-top: 10px; 
  display: inline-block;
  padding: 10px 20px;
  margin: 10px 30px; /* Add some space between buttons */;
  border: 2px solid #ccc;
  border-radius: 5px; /* Rounded corners for buttons */
  background-color: #f8f8f8;
  color: #333;
  text-align: center;
}

.calculator-section {
  display: flex;
  justify-content: center; 
  padding: 20px;
}

.calculator {
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 10px;
	margin: auto;
	width:auto;
}

.display {
	grid-column: 1/ -1;
	text-align: right;
	padding: 15px;
	background-color: #eee;
	border: 1px solid #ddd;
}

.buttons {
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	grid-template-rows: repeat(4, 1fr);
	grid-gap: 10px;
}

.buttons button {
	padding: 15px;
	border: 1px solid #ccc;
	background-color: #f8f8f8;
	cursor: pointer;
	font-size: 1.2em;
}

.buttons button:hover {
	background-color: #e0e0e0;
}

.buttons button.wide {
	grid-column: 1 / 3;
}

.buttons button.tall {
	grid-row: 3 / 5;
}
.display.normal {
	font-size: 1.5em;
}

.display.small {
	font-size: 1.2em;
}

.display.very-small {
	font-size: 1em;
}
.log {
	grid-column: 2;
	text-align: left;
	padding: 10px;
	background-color: #eee;
	border: 1px solid #ddd;
	max-height: 222px;
	font-size: 1em;
	overflow-y: scroll;
}
</style>