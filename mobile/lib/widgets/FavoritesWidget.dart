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
      childAspectRatio: 2.8,
      physics: const NeverScrollableScrollPhysics(),
      crossAxisCount: 1,
      shrinkWrap: true,
      children: List.generate(8, (index) {
        final isFavorite = favoriteStates[index];
        if (isFavorite) {
          return Container();
        } else {
          return Container(
              padding: const EdgeInsets.all(10),
              margin: const EdgeInsets.symmetric(vertical: 8, horizontal: 10),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(20),
              ),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    margin: const EdgeInsets.only(right: 10),
                    height: 120,
                    width: 120,
                    child: Image.asset("assets/images/article_$index.png"),
                  ),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        InkWell(
                          onTap: (){
                            Navigator.pushNamed(context, "itemPage");
                          },
                          child: Container(
                            padding: const EdgeInsets.only(bottom: 8),
                            alignment: Alignment.centerLeft,
                            child: const Text(
                              "Product Title",
                              style: TextStyle(
                                fontSize: 18,
                                color: Color.fromARGB(255, 80, 39, 118),
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Flexible(
                              child: Container(
                                constraints: const BoxConstraints(maxWidth: 200),
                                child: const Text(
                                  "Product Description",
                                  style: TextStyle(
                                    fontSize: 14,
                                    color: Colors.grey,
                                  ),
                                  overflow: TextOverflow.ellipsis,
                                  maxLines: 2,
                                ),
                              ),
                            ),
                            const Icon(
                              Icons.add_shopping_cart,
                              size: 30,
                              color: Color.fromARGB(255, 80, 39, 118),
                            ),
                          ],
                        ),
                        const SizedBox(height: 15),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: const [
                            Text(
                              "45 €",
                              style: TextStyle(
                                fontSize: 18,
                                color: Color.fromARGB(255, 80, 39, 118),
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ],
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