import 'dart:convert';

import 'package:curved_navigation_bar/curved_navigation_bar.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:clippy_flutter/clippy_flutter.dart';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:meublox/models/item.dart';

import '../widgets/item_app_bar.dart';

class ItemPage extends StatefulWidget {
  final Item selectedItem;

  const ItemPage({super.key, required this.selectedItem});

  @override
  _ItemPageState createState() => _ItemPageState();
}
  
class _ItemPageState extends State<ItemPage> {
  int _currentImageIndex = 0;
  int _quantity = 1;
  double basePrice = 45.0;

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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFEDECF2),
      body: ListView(
        children: [
          ItemAppBar(nom: widget.selectedItem.nom),
          SizedBox(
            height: 300,
            child: Stack(
              children: [
                CarouselSlider(
                  items: imageUrls.map((imageUrl) {
                    return Padding(
                      padding: const EdgeInsets.all(16),
                      child: Image.network(widget.selectedItem.imagePath![0]),
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
                    Padding(
                      padding: const EdgeInsets.only(
                        top: 48,
                        bottom: 15,
                      ),
                      child: Row(
                        children: [
                          Text(
                            utf8.decode(widget.selectedItem.nom.runes.toList()),
                            style: const TextStyle(
                              fontSize: 28,
                              fontWeight: FontWeight.bold,
                              color: Color.fromARGB(255, 80, 39, 118),
                            ),
                          ),
                          const Spacer(),
                          Text(
                            "${widget.selectedItem.price.toStringAsFixed(2)} €",
                            style: const TextStyle(
                              fontSize: 25,
                              fontWeight: FontWeight.bold,
                              color: Color.fromARGB(255, 80, 39, 118),
                            ),
                          ),
                        ],
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.symmetric(vertical: 12),
                      child: Text(
                        utf8.decode(widget.selectedItem.description.runes.toList()),
                        textAlign: TextAlign.justify,
                        style: const TextStyle(
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
                            initialRating: widget.selectedItem.note?.toDouble() ?? 0.0,
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
                          Text(
                            widget.selectedItem.note.toString(),
                            style: const TextStyle(
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
                              onPressed: () {},
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
            Navigator.pushNamed(context, "loginOrRegisterPage");
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