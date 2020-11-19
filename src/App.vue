<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
	export default {}
</script>

<style>
	* {
		margin: 0;
		padding: 0;
		text-decoration: none;
		list-style: none;
	}

	@media (max-width: @screen-sm) {
		[class*="col-"] {
			padding-left: 0;
			padding-right: 0;
		}

		.row {
			margin-left: 0;
			margin-right: 0;
		}

		.container-fluid {
			margin: 0;
			padding: 0;
		}
	}

	a:hover {
		text-decoration: none;
	}

	.text_12 {
		font-size: 12px;
	}

	.text_14 {
		font-size: 14px;
	}

	.text_16 {
		font-size: 16px;
	}

	.text_color1 {
		color: #999999;
	}

	.text_color2 {
		color: #000000;
	}
	
	.text_14_col1{
		font-size: 14px;
		color: #999999;
	}
	
	.text_14_col1:hover{
		color: #ff5d23;
	}
	
	.text_hover:hover{
		color: #ff5d23;
	}
</style>
