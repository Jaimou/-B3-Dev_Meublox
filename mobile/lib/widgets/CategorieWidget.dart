import 'package:flutter/material.dart';

class CategorieWidget extends StatelessWidget {
  final String category;

  const CategorieWidget({super.key, required this.category});

  @override
  Widget build(BuildContext context) {
    return GridView.count(
      childAspectRatio: 0.68,
      physics: const NeverScrollableScrollPhysics(),
      crossAxisCount: 2,
      shrinkWrap: true,
      children: [
        for (int i=0; i<8; i++)
          Container(
            padding: const EdgeInsets.only(left: 15, right: 15, top: 10),
            margin: const EdgeInsets.symmetric(vertical: 8, horizontal: 10),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(20),
            ),
            child: Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: const [
                    Icon(
                      Icons.favorite_border,
                      color: Colors.red,
                    ),
                  ],
                ),
                InkWell(
                  onTap: (){
                    Navigator.pushNamed(context, "itemPage");
                  },
                  child: Container(
                    margin: const EdgeInsets.all(10),
                    height: 120,
                    width: 120,
                    child: Image.asset("assets/images/article_$i.png"),
                  ),
                ),
                Container(
                  padding: const EdgeInsets.only(bottom: 10),
                  alignment: Alignment.centerLeft,
                  child: const Text(
                    "Product Title",
                    style: TextStyle(
                      fontSize: 18,
                      color: Color.fromARGB(255, 80, 39, 118),
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                Container(
                  alignment: Alignment.centerLeft,
                  child: const Text(
                    "Product Description",
                    style: TextStyle(
                      fontSize: 14,
                      color: Colors.grey,
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.symmetric(vertical: 15),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: const [
                      Text(
                        "45 €",
                        style: TextStyle(
                          fontSize: 20,
                          color: Color.fromARGB(255, 80, 39, 118),
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
      ],
    );
  }
}