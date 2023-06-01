import 'package:flutter/material.dart';

import '../pages/FilterPage.dart';

class CategorieAppBar extends StatelessWidget {
  const CategorieAppBar({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.white,
      padding: const EdgeInsets.all(25),
      child: Row(
        children: [
          InkWell(
            onTap: (){
              Navigator.pop(context);
            },
            child: const Icon(
              Icons.arrow_back,
              size: 30,
              color: Color.fromARGB(255, 80, 39, 118),
            ),
          ),
          const Padding(
            padding: EdgeInsets.only(left: 20),
            child: Text(
              "Categorie Title",
              style: TextStyle(
                fontSize: 23,
                fontWeight: FontWeight.bold,
                color: Color.fromARGB(255, 80, 39, 118),
              ),
            ),
          ),
          const Spacer(),
          InkWell(
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => const FilterPage(),
                ),
              );
            },
            child: const Text(
              "Filtrer",
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: Color.fromARGB(255, 80, 39, 118),
              ),
            ),
          ),
        ],
      ),
    );
  }
}