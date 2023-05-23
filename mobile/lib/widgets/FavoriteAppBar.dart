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
            color: Colors.orange,
          ),
        ),
        const Padding(
          padding: EdgeInsets.only(left: 20),
          child: Text(
            "Favoris",
            style: TextStyle(
              color: Colors.orange,
              fontSize: 23,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
        const Spacer(),
        const Icon(
          Icons.more_vert,
          size: 30,
          color: Colors.orange,
        ),
      ]),
    );
  }
}