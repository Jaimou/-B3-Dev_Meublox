import 'package:curved_navigation_bar/curved_navigation_bar.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:clippy_flutter/clippy_flutter.dart';
import 'package:carousel_slider/carousel_slider.dart';

import '../models/CartItem.dart';
import '../widgets/ItemAppBar.dart';

class ItemPage extends StatefulWidget {
  const ItemPage({super.key});

  @override
  _ItemPageState createState() => _ItemPageState();
}

int _currentImageIndex = 0;
int _quantity = 1;
double basePrice = 45.0;
  
class _ItemPageState extends State<ItemPage> {

  // List<Color> Clrs = [
  //   Colors.orange,
  //   Colors.red,
  //   Colors.blue,
  //   Colors.green,
  //   Colors.yellow,
  // ];

  final List<String> imageUrls = [
    "assets/images/article_0.png",
    "assets/images/article_1.png",
    "assets/images/article_2.png",
    "assets/images/article_5.png",
  ];

  void _decreaseQuantity() {
    setState(() {
      if (_quantity > 1) {
        _quantity--;
      }
    });
  }

  void _increaseQuantity() {
    setState(() {
      _quantity++;
    });
  }

  void _addToCart() {
    CartItem(
      title: "Product Title",
      price: basePrice,
      quantity: _quantity,
    );

    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text("Produit ajouté au panier"),
          actions: [
            ElevatedButton(
              onPressed: () {
                Navigator.pop(context);
              },
              child: const Text("OK"),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFEDECF2),
      body: ListView(
        children: [
          const ItemAppBar(),
          SizedBox(
            height: 300,
            child: Stack(
              children: [
                CarouselSlider(
                  items: imageUrls.map((imageUrl) {
                    return Padding(
                      padding: const EdgeInsets.all(16),
                      child: Image.asset(
                        imageUrl,
                      ),
                    );
                  }).toList(),
                  options: CarouselOptions(
                    onPageChanged: (index, reason) {
                      setState(() {
                        _currentImageIndex = index;
                      });
                    },
                  ),
                ),
                Positioned(
                  left: 0,
                  right: 0,
                  bottom: 16,
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: imageUrls.map((imageUrl) {
                      int index = imageUrls.indexOf(imageUrl);
                      return Container(
                        width: 8.0,
                        height: 8.0,
                        margin: const EdgeInsets.symmetric(
                          vertical: 10.0,
                          horizontal: 2.0,
                        ),
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          color: _currentImageIndex == index
                              ? const Color.fromARGB(255, 80, 39, 118)
                              : Colors.grey.withOpacity(0.5),
                        ),
                      );
                    }).toList(),
                  ),
                ),
              ],
            ),
          ),
          Arc(
            edge: Edge.TOP,
            arcType: ArcType.CONVEY,
            height: 30,
            child: Container(
              width: double.infinity,
              color: Colors.white,
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                child: Column(
                  children: [
                    const Padding(
                      padding: EdgeInsets.only(
                        top: 48,
                        bottom: 15,
                      ),
                      child: Row(
                        children: [
                          Text(
                            "Product Title",
                            style: TextStyle(
                              fontSize: 28,
                              fontWeight: FontWeight.bold,
                              color: Color.fromARGB(255, 80, 39, 118),
                            ),
                          ),
                          Spacer(),
                          // Récupérer le prix de l'article avec l'API
                          Text(
                            "45 €",
                            style: TextStyle(
                              fontSize: 25,
                              fontWeight: FontWeight.bold,
                              color: Color.fromARGB(255, 80, 39, 118),
                            ),
                          ),
                        ],
                      ),
                    ),
                    const Padding(
                      padding: EdgeInsets.symmetric(vertical: 12),
                      child: Text(
                        "Voici encore plus de texte pour décrire le produit. On peut écrire plus d'informations sur le produit comme par exemple les dimensions et les informations sur les matières.",
                        textAlign: TextAlign.justify,
                        style: TextStyle(
                          fontSize: 17,
                          color: Color.fromARGB(255, 80, 39, 118),
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(
                        top: 15,
                        bottom: 15,
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          RatingBar.builder(
                            initialRating: 4,
                            minRating: 1,
                            direction: Axis.horizontal,
                            itemCount: 5,
                            itemSize: 20,
                            itemPadding: const EdgeInsets.symmetric(horizontal: 3),
                            itemBuilder: (context, _) => const Icon(
                              Icons.star,
                              color: Colors.amber,
                            ),
                            onRatingUpdate: (index) {},
                          ),
                          const Text(
                            "(17)",
                            style: TextStyle(
                              fontSize: 18,
                              color: Color.fromARGB(255, 80, 39, 118),
                            ),
                          ),
                          const Spacer(),
                          Row(
                            children: [
                              GestureDetector(
                                onTap: _decreaseQuantity,
                                child: Container(
                                  padding: const EdgeInsets.all(5),
                                  decoration: BoxDecoration(
                                    color: Colors.white,
                                    borderRadius: BorderRadius.circular(20),
                                    boxShadow: [
                                      BoxShadow(
                                        color: Colors.grey.withOpacity(0.5),
                                        spreadRadius: 3,
                                        blurRadius: 10,
                                        offset: const Offset(0, 3),
                                      ),
                                    ],
                                  ),
                                  child: const Icon(
                                    CupertinoIcons.minus,
                                    size: 18,
                                    color: Color.fromARGB(255, 80, 39, 118),
                                  ),
                                ),
                              ),
                              Container(
                                margin: const EdgeInsets.symmetric(horizontal: 10),
                                child: Text(
                                  _quantity.toString().padLeft(2, '0'),
                                  style: const TextStyle(
                                    fontSize: 18,
                                    fontWeight: FontWeight.bold,
                                    color: Color.fromARGB(255, 80, 39, 118),
                                  ),
                                ),
                              ),
                              GestureDetector(
                                onTap: _increaseQuantity,
                                child: Container(
                                  padding: const EdgeInsets.all(5),
                                  decoration: BoxDecoration(
                                    color: Colors.white,
                                    borderRadius: BorderRadius.circular(20),
                                    boxShadow: [
                                      BoxShadow(
                                        color: Colors.grey.withOpacity(0.5),
                                        spreadRadius: 3,
                                        blurRadius: 10,
                                        offset: const Offset(0, 3),
                                      ),
                                    ],
                                  ),
                                  child: const Icon(
                                    CupertinoIcons.plus,
                                    size: 18,
                                    color: Color.fromARGB(255, 80, 39, 118),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                    SizedBox(
                      width: MediaQuery.of(context).size.width,
                      height: 70,
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Expanded(
                            child: ElevatedButton.icon(
                              onPressed: _addToCart,
                              icon: const Icon(CupertinoIcons.cart_badge_plus),
                              label: const Text(
                                "Ajouter au panier",
                                style: TextStyle(
                                  fontSize: 16,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.white,
                                )
                              ),
                              style: ButtonStyle(
                                backgroundColor: MaterialStateProperty.all(const Color.fromARGB(255, 80, 39, 118)),
                                padding: MaterialStateProperty.all(
                                  const EdgeInsets.symmetric(
                                    horizontal: 20,
                                    vertical: 13
                                  ),
                                ),
                                shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                                  RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(10),
                                  ),
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                    // Padding(
                    //   padding: const EdgeInsets.symmetric(vertical: 8),
                    //   child: Row(
                    //     children: [
                    //       const Text(
                    //         "Size : ",
                    //         style: TextStyle(
                    //           fontSize: 18,
                    //           fontWeight: FontWeight.bold,
                    //           color: Colors.orange,
                    //         ),
                    //       ),
                    //       const SizedBox(
                    //         width: 10,
                    //       ),
                    //       Row(
                    //         children: [
                    //           for (int i = 5; i < 10; i++)
                    //             Container(
                    //               height: 30,
                    //               width: 30,
                    //               alignment: Alignment.center,
                    //               margin:
                    //                   const EdgeInsets.symmetric(horizontal: 5),
                    //               decoration: BoxDecoration(
                    //                   color: Colors.white,
                    //                   borderRadius: BorderRadius.circular(30),
                    //                   boxShadow: [
                    //                     BoxShadow(
                    //                       color: Colors.grey.withOpacity(0.5),
                    //                       spreadRadius: 2,
                    //                       blurRadius: 8,
                    //                     ),
                    //                   ]),
                    //               child: Text(
                    //                 i.toString(),
                    //                 style: const TextStyle(
                    //                   fontSize: 18,
                    //                   fontWeight: FontWeight.bold,
                    //                   color: Colors.orange,
                    //                 ),
                    //               ),
                    //             ),
                    //         ],
                    //       ),
                    //     ],
                    //   ),
                    // ),
                    // Padding(
                    //   padding: const EdgeInsets.symmetric(vertical: 8),
                    //   child: Row(
                    //     children: [
                    //       const Text(
                    //         "Color : ",
                    //         style: TextStyle(
                    //           fontSize: 18,
                    //           fontWeight: FontWeight.bold,
                    //           color: Colors.orange,
                    //         ),
                    //       ),
                    //       const SizedBox(
                    //         width: 10,
                    //       ),
                    //       Row(
                    //         children: [
                    //           for (int i = 0; i < 5; i++)
                    //             Container(
                    //               height: 30,
                    //               width: 30,
                    //               alignment: Alignment.center,
                    //               margin:
                    //                   const EdgeInsets.symmetric(horizontal: 5),
                    //               decoration: BoxDecoration(
                    //                   color: Clrs[i],
                    //                   borderRadius: BorderRadius.circular(30),
                    //                   boxShadow: [
                    //                     BoxShadow(
                    //                       color: Colors.grey.withOpacity(0.5),
                    //                       spreadRadius: 2,
                    //                       blurRadius: 8,
                    //                     ),
                    //                   ]),
                    //             ),
                    //         ],
                    //       ),
                    //     ],
                    //   ),
                    // ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
      bottomNavigationBar: CurvedNavigationBar(
        backgroundColor: Colors.transparent,
        onTap: (index) {
          if (index == 0) {
            Navigator.pushNamed(context, "/");
          } else if (index == 1) {
            Navigator.pushNamed(context, "searchPage");
          } else if (index == 2) {
            Navigator.pushNamed(context, "favoritePage");
          } else if (index == 3) {
            Navigator.pushNamed(context, "cartPage");
          } else if (index == 4) {
            Navigator.pushNamed(context, "profilePage");
          }
        },
        height: 65,
        color: const Color.fromARGB(255, 80, 39, 118),
        index: 1,
        items: const [
          Icon(
            Icons.home,
            size: 30,
            color: Colors.white,
          ),
          Icon(
            Icons.search,
            size: 30,
            color: Colors.white,
          ),
          Icon(
            Icons.favorite,
            size: 30,
            color: Colors.white,
          ),
          Icon(
            Icons.shopping_cart,
            size: 30,
            color: Colors.white,
          ),
          Icon(
            Icons.person,
            size: 30,
            color: Colors.white,
          ),
        ],
      ),
    );
  }
}