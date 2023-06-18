import 'package:flutter/material.dart';

class FavoriteAppBar extends StatefulWidget {
  const FavoriteAppBar({super.key});

  @override
  _FavoriteAppBarState createState() => _FavoriteAppBarState();
}

class _FavoriteAppBarState extends State<FavoriteAppBar> {
  bool isEditing = false;

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.white,
      padding: const EdgeInsets.all(25),
      child: Row(children: [
        InkWell(
          onTap: () {
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
            setState(() {
              isEditing = !isEditing;
            });
          },
          child: Text(
            isEditing ? "Terminer" : "Modifier",
            style: const TextStyle(
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