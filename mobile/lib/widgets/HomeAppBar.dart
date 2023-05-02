import 'package:flutter/material.dart';
import 'package:badges/badges.dart' as badges;

class HomeAppBar extends StatelessWidget {
  const HomeAppBar({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.white,
      padding: const EdgeInsets.all(20),
      child: Row(
        children: [
          const Icon(
            Icons.sort,
            size: 30,
            color: Colors.orange,
          ),
          const Spacer(),
          InkWell(
            onTap: (){
              Navigator.pushNamed(context, "/");
            },
            child : const Image(
              image: AssetImage("assets/images/logo_sans_meublox.png"),
              height: 50,
              width: 50,
            ),
          ),
          const Spacer(),
          badges.Badge(
            badgeColor: Colors.orange,
            padding: const EdgeInsets.all(7),
            badgeContent: const Text(
              "3",
              style: TextStyle(
                color: Colors.white,
              ),
            ),
            child: InkWell(
              onTap: (){
                Navigator.pushNamed(context, "cartPage");
              },
              child: const Icon(
                Icons.shopping_bag_outlined,
                size: 32,
                color: Colors.orange,
              ),
            )
          ),
        ],
      ),
    );
  }
}