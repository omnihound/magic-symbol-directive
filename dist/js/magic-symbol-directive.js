angular.module('magicSymbolDirective', []).directive('castingCost', function(){
	function link(scope, element, attrs) {
	  var castingCost;

	  scope.$watch(attrs.castingCost, function(value){
	    element.html('');
	    castingCost = value;

	    if(castingCost != null) {
	      castingCostArray = castingCost.toLowerCase().replace(new RegExp('}{','g'), ",").replace('{', "").replace('}', "").replace(new RegExp('/','g'),"").split(",");
	      
	      castingCostArray.forEach(function(cc) {
				var symbol = document.createElement('span');
				symbol.classList.add('mana');
				symbol.classList.add('mana-' + cc);

				element.append(symbol);
	      });
	    }
	    
	  });
	}
	
	return {
	  link : link
	};

}).directive('cardText', function(){
	function link(scope, element, attrs) {
	  var cardText;


	  scope.$watch(attrs.cardText, function(value){
	    element.html('');
	
	    cardText = value;
	    if (cardText != null) {

	      //carriage return with lines
	      cardText = cardText.replace(new RegExp('\n\n','g'),'<br/><br/>');
	      var symbolArray = cardText.match(new RegExp('\{.{1,3}\}', 'g'));

	      //console.log(JSON.stringify(symbolArray));
	      if (symbolArray != null) {
	        symbolArray.forEach(function(symbol){
			var styleToken = symbol.toLowerCase().replace('{', "").replace('}', "").replace('/',"");
			cardText = cardText.replace(symbol, "<span class='mana mana-"+ styleToken +"'></span>");
	        });
	      }
		
	      element.html(cardText);
	   }
	  });
	};

	return {
	  link : link
	};
}).service('cardTextProcessor', function() {
	return function(string) {

	      //carriage return with lines
	      cardText = string.replace(new RegExp('\n\n','g'),'<br/><br/>');
	      var symbolArray = cardText.match(new RegExp('\{.{1,3}\}', 'g'));

	      //console.log(JSON.stringify(symbolArray));
	      if (symbolArray != null) {
	        symbolArray.forEach(function(symbol){
			var styleToken = symbol.toLowerCase().replace('{', "").replace('}', "").replace('/',"");
			cardText = cardText.replace(symbol, '<span class="mana mana-'+ styleToken +'"></span>');
	        });
	      }

	      return cardText;	
	}
});
