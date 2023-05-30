import 'package:curved_navigation_bar/curved_navigation_bar.dart';
import 'package:flutter/material.dart';

import '../widgets/SearchAppBar.dart';
import '../widgets/SearchDelegate.dart';

class SearchPage extends StatelessWidget {
  const SearchPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFEDECF2),
      body: ListView(
        children: [
          const SearchAppBar(),
          Container(
            // Temporary height
            height: 700,
            padding: const EdgeInsets.only(top: 15),
            decoration: const BoxDecoration(
              color: Color(0xFFEDECF2),
              borderRadius: BorderRadius.only(
                topLeft: Radius.circular(35),
                topRight: Radius.circular(35),
              ),
            ),
            child: Column(
              children: [
                Container(
                  margin: const EdgeInsets.symmetric(horizontal: 15),
                  padding: const EdgeInsets.symmetric(horizontal: 15),
                  height: 50,
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(30),
                  ),
                  child: Row(
                    children: [
                      Container(
                        margin: const EdgeInsets.only(left: 5),
                        height: 50,
                        width: 300,
                        child: TextFormField(
                          decoration: const InputDecoration(
                            border: InputBorder.none,
                            hintText: "Rechercher un article",
                          ),
                          onTap: (){
                            showSearch(
                              context: context,
                              delegate: MySearchDelegate(),
                            );
                          },
                        ),
                      ),
                      const Spacer(),
                      const Icon(
                        Icons.search,
                        size: 27,
                        color: Colors.orange,
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 20),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 15),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      CategoryButton(
                        category: 'Bureau',
                        onPressed: () {
                          // Action lorsque le bouton Bureau est cliqué
                        },
                      ),
                      const SizedBox(height: 10),
                      CategoryButton(
                        category: 'Canapé',
                        onPressed: () {
                          // Action lorsque le bouton Canapé est cliqué
                        },
                      ),
                      const SizedBox(height: 10),
                      CategoryButton(
                        category: 'Chaise',
                        onPressed: () {
                          // Action lorsque le bouton Chaise est cliqué
                        },
                      ),
                      const SizedBox(height: 10),
                      CategoryButton(
                        category: 'Meuble',
                        onPressed: () {
                          // Action lorsque le bouton Meuble est cliqué
                        },
                      ),
                      const SizedBox(height: 10),
                      CategoryButton(
                        category: 'Table',
                        onPressed: () {
                          // Action lorsque le bouton Table est cliqué
                        },
                      ),
                    ],
                  ),
                ),
              ],
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
          } else if (index == 2) {
            Navigator.pushNamed(context, "favoritePage");
          } else if (index == 3) {
            Navigator.pushNamed(context, "cartPage");
          } else if (index == 4) {
            Navigator.pushNamed(context, "profilePage");
          }
        },
        height: 65,
        color: Colors.orange,
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

class CategoryButton extends StatelessWidget {
  final String category;
  final VoidCallback onPressed;

  const CategoryButton({
    Key? key,
    required this.category,
    required this.onPressed,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onPressed,
      child: Container(
        width: 80,
        height: 70,
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(10),
          boxShadow: [
            BoxShadow(
              color: Colors.grey.withOpacity(0.5),
              spreadRadius: 2,
              blurRadius: 8,
            ),
          ],
        ),
        child: Row(
          children: [
            const SizedBox(width: 16),
            Expanded(
              child: Text(
                category,
                style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
            const Icon(
              Icons.arrow_forward_ios,
              size: 20,
              color: Colors.grey,
            ),
            const SizedBox(width: 16),
          ],
        ),
      ),
    );
  }
}