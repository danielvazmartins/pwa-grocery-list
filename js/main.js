var produtos = [];

$(function(){
	var init = function() {
		reloadProdutos();
		registerServiceWork();
	}

	$("#bt-add-product").click(function() {
		var produto = $("#new-product").val().trim();
		if ( produto.length > 0 ) {
			produtos.push(produto);
			$("#new-product").val("");
			reloadProdutos();
		}		
	});

	function reloadProdutos() {
		$("#lista").empty();
		produtos.map(function(produto) {
			$("#lista").append("<li class='collection-item'>" + produto + "</li>");
		});
	}
	
	function registerServiceWork() {
		if ('serviceWorker' in navigator) {
	    	navigator.serviceWorker
	    	.register('js/service-worker.js')
		    .then(function(reg) {
		        console.log('Service worker Registered');
		    })
		    .catch(function (err) {
		        console.log('erro', err);
		    });
		}
	}

	init();	
});