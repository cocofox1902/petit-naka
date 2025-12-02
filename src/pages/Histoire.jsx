function Histoire() {
  return (
    <section className="py-16 md:py-24 bg-black min-h-screen">
      <div className="mx-auto px-4 md:px-6 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Notre Histoire</h2>
          <div className="w-24 h-1 bg-red-600 mx-auto"></div>
        </div>
        
        {/* Image principale - Intérieur du restaurant */}
        <div className="mb-12 rounded-lg overflow-hidden shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80" 
            alt="Intérieur du restaurant Petit Naka"
            className="w-full h-96 md:h-[500px] object-cover transition-all duration-700 hover:scale-110"
          />
        </div>
        
        <div className="mb-12">
          <div className="space-y-6 text-gray-300 leading-relaxed text-base md:text-lg max-w-4xl mx-auto">
            <p>
              Nos plats aux prix accessibles sont préparés par des chefs Japonais. Parmis nos spécialités, nous proposons des sushis (californiens, makis, nigiris), sashimis, chirashis (saumon, thon, assortiment), domburis (poulet ou saumon teriyaki, omelette au poulet) ou poke bowls (saumon, thon, dorade, poulpe, tofu). Du coté des entrées nous avons des salades (choux, algues, épinards, pommes de terre) ou de la soupe miso. Le tout peut être accompagné par des gyozas, nouilles sautées, tempura ou autres.
            </p>
            <p>
              Nous proposons également des désserts Japonais comme les cake au thé vert matcha, le dorayaki, daifuku ou de la glace maison (thé vert matcha ou sésame).
            </p>
            <p>
              Nos plats sont disponibles sur place, à emporter ou en livraison.
            </p>
            <p className="text-center mt-8 text-white font-semibold">
              Au plaisir de vous recevoir!
            </p>
            <p className="text-center text-gray-400">
              - L'équipe de Petit Naka -
            </p>
          </div>
        </div>

        {/* Images de plats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600&q=80"
              alt="Sushi"
              className="w-full h-64 object-cover transition-all duration-500 hover:scale-110"
            />
          </div>
          <div className="rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80"
              alt="Ramen"
              className="w-full h-64 object-cover transition-all duration-500 hover:scale-110"
            />
          </div>
          <div className="rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=600&q=80"
              alt="Yakitori"
              className="w-full h-64 object-cover transition-all duration-500 hover:scale-110"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700/50">
            <h3 className="text-white font-bold text-xl mb-4">Notre Philosophie</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Authenticité, fraîcheur et respect des traditions japonaises sont les valeurs qui guident 
              notre cuisine au quotidien. Chaque ingrédient est sélectionné avec soin pour garantir 
              une expérience gustative exceptionnelle.
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700/50">
            <h3 className="text-white font-bold text-xl mb-4">Nos Engagements</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Des ingrédients de qualité, une préparation soignée et un service chaleureux pour 
              votre plus grand plaisir. Nous sommes fiers de vous accueillir dans notre restaurant 
              pour une expérience authentique et mémorable.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Histoire
