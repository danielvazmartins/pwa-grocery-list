var produtos = window.localStorage.getItem('produtos') || '[]';
produtos = JSON.parse(produtos);

$(function(){
	// Funcao de inicializacao
	var init = function() {
		reloadProdutos();
		registerServiceWork();
	}

	// Adicionar produto
	$("#bt-add-product").click(function() {
		var produto = $("#new-product").val().trim();
		if ( produto.length > 0 ) {
			produtos.push(produto);
			window.localStorage.setItem('produtos', JSON.stringify(produtos));
			$("#new-product").val("");
			reloadProdutos();
		}		
	});	

	// Ativar ou desativar modo Full Screem
	$("#full-screen").click(function(e) {
		e.preventDefault();

		var fullElement = document.documentElement;

		// Verifica se esta em fullScreen
		if ( document.fullscreenElement || document.webkitFullscreenElement || 
			 document.mozFullScreenElement || document.msFullscreenElement
		) {
			// Sai do modo fullScreen
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			}
			$(".material-icons", this).text("fullscreen");
		} else {
			// Entra em fullScreen
			if (fullElement.requestFullscreen) {
				fullElement.requestFullscreen();
			} else if (fullElement.webkitRequestFullscreen) {
				fullElement.webkitRequestFullscreen();
			} else if (fullElement.mozRequestFullScreen) {
				fullElement.mozRequestFullScreen();
			} else if (fullElement.msRequestFullscreen) {
				fullElement.msRequestFullscreen();
			}
			$(".material-icons", this).text("fullscreen_exit");
		}
	});
	
	// Registrar o service worker
	function registerServiceWork() {
		if ('serviceWorker' in navigator) {
	    	navigator.serviceWorker
	    	.register('./service-worker.js')
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

// Recarregar lista de produtos
function reloadProdutos() {
	$("#lista").empty();
	produtos.map(function(produto, index) {
		$("#lista").append("<li class='collection-item'>" + produto + "<a href='javascript:removeProduct(" + index + ")' class='secondary-content'><i class='material-icons'>clear</i></a></li>");
	});
}

// Remover produto
function removeProduct(position) {
	console.log(position);
	// Remove o produto do array
	produtos.splice(position, 1);
	reloadProdutos();
}