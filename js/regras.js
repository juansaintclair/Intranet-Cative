/* global Ps */
/* global define */
/// <reference path="../../../typings/jquery/jquery.d.ts"/>
/**
 * @package     Cattive.Site
 * @subpackage  Templates.cattive
 *
 * @copyright   Copyright (C) 2015, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

/* global  $, Pace, SelectFx, FForm, classie, DialogFx */


//Plugin Click Toggle
/*
 * jQuery Function Toggle Pluing
 * Copyright 2011, Felix Kling
 * Dual licensed under the MIT or GPL Version 2 licenses.
 */
; (function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['jquery'], factory);
	} else {
		// Browser globals
		factory(jQuery);
	}
})(function ($) {
	$.fn.funcToggle = function (type, data) {
		var dname = "jqp_eventtoggle_" + type + (new Date()).getTime(),
			funcs = Array.prototype.slice.call(arguments, 2),
			numFuncs = funcs.length,
			empty = function () { },
			false_handler = function () { return false; };

		if (typeof type === "object") {
			for (var key in type) {
				$.fn.funcToggle.apply(this, [key].concat(type[key]));
			}
			return this;
		}
		if ($.isFunction(data) || data === false) {
			funcs = [data].concat(funcs);
			numFuncs += 1;
			data = undefined;
		}

		funcs = $.map(funcs, function (func) {
			if (func === false) {
				return false_handler;
			}
			if (!$.isFunction(func)) {
				return empty;
			}
			return func;
		});

		this.data(dname, 0);
		this.bind(type, data, function (event) {
			var data = $(this).data(),
				index = data[dname];
			funcs[index].call(this, event);
			data[dname] = (index + 1) % numFuncs;
		});
		return this;
	};
});



$(function () {
	//Scroll dos menus netos
	var scrolls = ['container-admSites', 'container-Atendimento', 'container-Projetos', 'container-dar-suporte', 'containerDarSuporteMobile', 'containerProjetosMobile', 'containerAtendimentoMobile', 'admSitesMobile'];

	for (var i = 0; i < scrolls.length; i++) {
		var container = document.getElementById(scrolls[i]);
		Ps.initialize(container);
	}

	//Achar o Height do Browser e calcular o espaço do Atividades Recentes
	function mudaTamanhoMobile() {
		var browserHeight = $(window).height();
		$('#containerDarSuporteMobile, #containerProjetosMobile, #containerAtendimentoMobile, #admSitesMobile').css({ height: browserHeight - 200 });
	};

	//Iniciar a funçao no Load
	mudaTamanhoMobile();
	//Iniciar a funçao no Resize Window
	$(window).resize(mudaTamanhoMobile);

	//Smooth Scroll
	$('a[href*=#]:not([href=#])').click(function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
			|| location.hostname == this.hostname) {

			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 1000);
				return false;
			}
		}
	});

	//Abrir e fechar o menu
	//$('.menu-top').funcToggle('click', function () {
	//	$('.megamenu').fadeIn(200);
	//}, function () {
	//	$('.megamenu').fadeOut(200);
	//});

	$('.abrir-menu').mouseover(function () {
		$('.megamenu').fadeIn(200);
	});

	//Fechar o menu no mouseOver
	$('.megamenu').mouseleave(function () {
		//$('.menu-top').click();
		$(this).fadeOut(200);
	});

});


