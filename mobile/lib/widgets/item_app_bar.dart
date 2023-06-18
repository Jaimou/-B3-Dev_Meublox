import 'dart:convert';

import 'package:flutter/material.dart';

class ItemAppBar extends StatelessWidget {
  final String nom;

  const ItemAppBar({super.key, required this.nom});

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
          Padding(
            padding: const EdgeInsets.only(left: 20),
            child: Text(
              utf8.decode(nom.runes.toList()),
              style: const TextStyle(
                fontSize: 23,
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