import 'package:flutter/material.dart';

class FavoriteAppBar extends StatelessWidget {
  const FavoriteAppBar({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.white,
      padding: const EdgeInsets.all(25),
      child: Row(children: [
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
            "Favoris",
            style: TextStyle(
              color: Color.fromARGB(255, 80, 39, 118),
              fontSize: 23,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
        const Spacer(),
        InkWell(
            onTap: () {
              
            },
            child: const Text(
              "Modifier",
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: Color.fromARGB(255, 80, 39, 118),
              ),
            ),
          ),
      ]),
    );
  }
}