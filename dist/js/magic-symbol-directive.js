angular.module('magicSymbolDirective', []).directive('castingCost', function(){
	function link(scope, element, attrs) {
	  var castingCost;

	  

	  scope.$watch(attrs.castingCost, function(value){
	    element.empty();
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

});
