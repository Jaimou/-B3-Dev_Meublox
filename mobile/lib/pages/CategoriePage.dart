import 'package:curved_navigation_bar/curved_navigation_bar.dart';
import 'package:flutter/material.dart';

import '../widgets/CategorieAppBar.dart';
import '../widgets/CategorieWidget.dart';

class CategoriePage extends StatelessWidget {
  final String category;
  const CategoriePage({super.key, required this.category,});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFEDECF2),
      body: ListView(
        children: const [
          CategorieAppBar(),
          CategorieWidget(category: '',),
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