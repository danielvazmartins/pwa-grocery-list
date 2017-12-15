var produtos = window.localStorage.getItem('produtos') || '[]';
produtos = JSON.parse(produtos);

$(function(){
	var init = function() {
		reloadProdutos();
		registerServiceWork();
	}

	$("#bt-add-product").click(function() {
		var produto = $("#new-product").val().trim();
		if ( produto.length > 0 ) {
			produtos.push(produto);
			window.localStorage.setItem('produtos', JSON.stringify(produtos));
			$("#new-product").val("");
			reloadProdutos();
		}		
	});

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

	function reloadProdutos() {
		$("#lista").empty();
		produtos.map(function(produto) {
			$("#lista").append("<li class='collection-item'>" + produto + "</li>");
		});
	}
	
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