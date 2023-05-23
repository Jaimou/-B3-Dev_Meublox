import 'package:flutter/material.dart';

class FavoritesWidget extends StatefulWidget {
  const FavoritesWidget({Key? key}) : super(key: key);

  @override
  _FavoritesWidgetState createState() => _FavoritesWidgetState();
}

class _FavoritesWidgetState extends State<FavoritesWidget> {
  List<bool> favoriteStates = List.generate(8, (index) => false);

  @override
  Widget build(BuildContext context) {
    return GridView.count(
      childAspectRatio: 0.68,
      physics: const NeverScrollableScrollPhysics(),
      crossAxisCount: 2,
      shrinkWrap: true,
      children: List.generate(8, (index) {
        final isFavorite = favoriteStates[index];
        if (isFavorite) {
          return Container();
        } else {
          return Container(
              padding: const EdgeInsets.only(left: 15, right: 15, top: 10),
              margin: const EdgeInsets.symmetric(vertical: 8, horizontal: 10),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(20),
              ),
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      IconButton(
                        icon: Icon(isFavorite ? Icons.favorite_border : Icons.favorite),
                        onPressed: (){
                          setState(() {
                            if (isFavorite) {
                              favoriteStates.removeAt(index); // Supprimer l'élement des favoris
                            } else {
                              favoriteStates[index] = true; // Ajouter l'élement aux favoris
                            }
                            favoriteStates[index] = !isFavorite; // Inverser l'état du favori
                          });
                        },
                        color: Colors.red,
                      ),
                    ],
                  ),
                  InkWell(
                    onTap: (){
                      Navigator.pushNamed(context, "itemPage");
                    },
                    child: Container(
                      margin: const EdgeInsets.all(10),
                      height: 120,
                      width: 120,
                      child: Image.asset("assets/images/article_$index.png"),
                    ),
                  ),
                  Container(
                    padding: const EdgeInsets.only(bottom: 8),
                    alignment: Alignment.centerLeft,
                    child: const Text(
                      "Product Title",
                      style: TextStyle(
                        fontSize: 18,
                        color: Colors.orange,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                  Container(
                    alignment: Alignment.centerLeft,
                    child: const Text(
                      "Product Description",
                      style: TextStyle(
                        fontSize: 14,
                        color: Colors.grey,
                      ),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.symmetric(vertical: 10),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: const [
                        Text(
                          "45 €",
                          style: TextStyle(
                            fontSize: 18,
                            color: Colors.orange,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            );
        }
      }),
    );
  }
}