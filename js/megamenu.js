/// <reference path="../../../typings/jquery/jquery.d.ts"/>
$(function () {
	eventos.setaEventos();
	metodos.preparaCss();
});

var config = {
	$filhoPadrao: $('.conteudo-filho-padrao:first'),
	$patriacas: $('.patriarca'),
	$paisNaoPatriarcas: $('.pai:not(.patriarca)'),
	$imagemPadrao: $('.imagemPadrao'),
	$netos: $('.menu-img > .filho'),
	$filhos: $('.menu-filho > .conteudo-filho-padrao > div'),
	$entidades: $('.patriarca, .filho > div, .neto > div').not('.item-filho').not('.ultimoPatriarca'),

	$ultimosFilhosAnimados: [],
	$ultimosNetosAnimados: []
};

var eventos = {
	setaEventos: function () {
		config.$patriacas.bind('mouseover', eventos.patriarcaMouseOver);
		config.$filhos.bind('mouseover', eventos.filhosMouseOver);
		config.$entidades.bind('mouseover', eventos.entidadesMouseOver);
	},

	atualizaScroll: function () {
		var scrolls = ['container-admSites', 'container-Atendimento', 'container-Projetos', 'container-dar-suporte'];

		for (var i = 0; i < scrolls.length; i++) {
			Ps.update(document.getElementById(scrolls[i]));
		}
	},

	entidadesMouseOver: function () {
		var $esse = $(this);
		var $ancestrais = $(parentesco.getAncestrais($esse));
		
		
		
		$('.marcadorLateral').removeClass('marcadorLateral');

		$ancestrais.each(function () {
			$(this).addClass('marcadorLateral');
		});

		$esse.addClass('marcadorLateral');
		
	},

	filhosMouseOver: function () {
		metodos.ocultaNetos();
		var $item = $(this);

		if ($item.hasClass('pai')) {
			var nomePai = parentesco.getNome($item);
			var $filhos = parentesco.getFilhos(nomePai);

			if (config.$ultimosNetosAnimados.length > 0) {
				$(config.$ultimosNetosAnimados).finish();
				config.$ultimosNetosAnimados = [];
			}

			if ($filhos.length > 0) {
				config.$ultimosNetosAnimados = $filhos;
				config.$imagemPadrao.hide();

				$filhos.fadeIn(300);

				eventos.atualizaScroll();
			} else {
				metodos.ocultaNetos();
			}
		}
	},

	patriarcaMouseOver: function () {
		var $pai = $(this);
		var nomePai = parentesco.getNome($pai);
		var $filhos = parentesco.getFilhos(nomePai);

		if (config.$ultimosFilhosAnimados.length > 0) {
			$(config.$ultimosFilhosAnimados).finish();
			config.$ultimosFilhosAnimados = [];
		}

		metodos.ocultaFilhos();

		if ($filhos.length > 0) {

			config.$ultimosFilhosAnimados = $filhos;
			$filhos.fadeIn(300);
		} else {
			config.$filhoPadrao.fadeIn('slow', function () {
				setTimeout(function () {
					console.log('esperando');
				}, 3000);
			});
		}
	}
};

var metodos = {
	ocultaFilhos: function () {
		$('.menu-filho > div.filho').hide();
		config.$filhoPadrao.hide();
		metodos.ocultaNetos();
	},

	ocultaNetos: function () {
		config.$netos.hide();
		config.$imagemPadrao.fadeIn('slow', function () {
				setTimeout(function () {
					console.log('esperando');
				}, 3000);
			});
	},

	preparaCss: function () {
		metodos.ocultaFilhos();
		metodos.ocultaNetos();
		config.$filhoPadrao.fadeIn(300);
	}
};

var parentesco = {
	getFilhos: function (nomePai) {
		return $('[data-pai="' + nomePai + '"]');
	},
	getPai: function (nomeFilho) {
		var nomePai = $("[data-nome=" + nomeFilho + '"]').data('pai');
		return $("[data-nome=" + nomePai + "]");
	},

	getAncestrais: function ($filho) {
		var lst = [],
			paizin = {};

		while (true) {
			paizin = $('[data-nome="' + $filho.parents('.filho').data('pai') + '"]');

			if (paizin.length > 0) {
				lst.push(paizin);
				$filho = paizin;
			}
			else {
				break;
			}
		}

		return lst;
	},

	getNaoPais: function () {
		return $('.filho').not('.pai');
	},
	getTios: function (item) {
		return $(item)
			.siblings('.pai')
			.get()
			.map(function ($pai) {
				return parentesco.getNome($pai);
			});
	},
	getNome: function ($item) {
		return $item.data('nome');
	}
};