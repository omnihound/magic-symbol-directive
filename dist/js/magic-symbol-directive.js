angular.module('magicSymbolDirective', []).directive('castingCost', function(){
	function link(scope, element, attrs) {
	  var castingCost;

	  scope.$watch(attrs.castingCost, function(value){
	    element.html('');
	    castingCost = value;

	    if(castingCost != null) {
	      castingCostArray = castingCost.toLowerCase().replace(new RegExp('}{','g'), ",").replace('{', "").replace('}', "").replace(new RegExp('/','g'),"").split(",");
	      
	      castingCostArray.forEach(function(cc) {
				var symbol = document.createElement('i');
				symbol.classList.add('ms');
				symbol.classList.add('ms-cost');
				symbol.classList.add('ms-shadow');
				symbol.classList.add('ms-' + cc);

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
			cardText = cardText.replace(symbol, "<i class='ms ms-cost ms-shadow ms-"+ styleToken +"'></i>");
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
			cardText = cardText.replace(symbol, '<i class="ms ms-cost ms-shadow ms-'+ styleToken +'"></i>');
	        });
	      }

	      return cardText;	
	}
});
