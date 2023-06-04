import 'package:flutter/material.dart';

class FilterWidget extends StatefulWidget {
  const FilterWidget({Key? key}) : super(key: key);

  @override
  _FilterWidgetState createState() => _FilterWidgetState();
}

class _FilterWidgetState extends State<FilterWidget> {
  RangeValues _currentRangeValues = const RangeValues(0.0, 500.0);
  final double _minValue = 0.0;
  final double _maxValue = 500.0;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            "Trier par",
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 20),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              SizedBox(
                width: 170,
                height: 50,
                child: ElevatedButton(
                  onPressed: () {
                    
                  },
                  style: ButtonStyle(
                    backgroundColor: MaterialStateProperty.all(
                      const Color.fromARGB(255, 80, 39, 118),
                    ),
                  ),
                  child: const Text(
                    "Prix croissant",
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
              SizedBox(
                width: 170,
                height: 50,
                child: ElevatedButton(
                  onPressed: () {
                    // Action lorsque le bouton "Prix décroissant" est cliqué
                  },
                  style: ButtonStyle(
                    backgroundColor: MaterialStateProperty.all(
                      const Color.fromARGB(255, 80, 39, 118),
                    ),
                  ),
                  child: const Text(
                    "Prix décroissant",
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 20),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              SizedBox(
                width: 170,
                height: 50,
                child: ElevatedButton(
                  onPressed: () {
                    // Action lorsque le bouton "Nom" est cliqué
                  },
                  style: ButtonStyle(
                    backgroundColor: MaterialStateProperty.all(
                      const Color.fromARGB(255, 80, 39, 118),
                    ),
                  ),
                  child: const Text(
                    "Nom",
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
              SizedBox(
                width: 170,
                height: 50,
                child: ElevatedButton(
                  onPressed: () {
                    // Action lorsque le bouton "Note" est cliqué
                  },
                  style: ButtonStyle(
                    backgroundColor: MaterialStateProperty.all(
                      const Color.fromARGB(255, 80, 39, 118),
                    ),
                  ),
                  child: const Text(
                    "Note",
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  )
                ),
              ),
            ],
          ),
          const SizedBox(height: 20),
          const Divider(
            color: Colors.black,
            thickness: 0.7,
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 20),
              const Text(
                "Filtrer par",
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 20),
              const Text(
                "Prix",
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
              Row(
                children: [
                  SizedBox(
                    width: 35,
                    child: Text(
                      '${_currentRangeValues.start.toStringAsFixed(0)} €',
                      textAlign: TextAlign.center,
                    ),
                  ),                  
                  Expanded(
                    child: RangeSlider(
                      values: _currentRangeValues,
                      min: _minValue,
                      max: _maxValue,
                      onChanged: (values) {
                        setState(() {
                          _currentRangeValues = values;
                        });
                      },
                    ),
                  ),
                  SizedBox(
                    width: 35,
                    child: Text(
                      '${_currentRangeValues.end.toStringAsFixed(0)} €',
                      textAlign: TextAlign.center,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 20),
              const Text(
                "Couleurs",
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                )
              ),
              const SizedBox(height: 10),
              Wrap(
                spacing: 10,
                runSpacing: 10,
                children: [
                  ClipOval(
                    child: ElevatedButton(
                      onPressed: () {

                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.red,
                        padding: const EdgeInsets.all(10),
                      ),
                      child: const SizedBox(
                        width: 40,
                        height: 40,
                      ),
                    ),
                  ),
                  ClipOval(
                    child: ElevatedButton(
                      onPressed: () {

                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.blue,
                        padding: const EdgeInsets.all(10),
                      ),
                      child: const SizedBox(
                        width: 40,
                        height: 40,
                      ),
                    ),
                  ),
                  ClipOval(
                    child: ElevatedButton(
                      onPressed: () {

                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.green,
                        padding: const EdgeInsets.all(10),
                      ),
                      child: const SizedBox(
                        width: 40,
                        height: 40,
                      ),
                    ),
                  ),
                  ClipOval(
                    child: ElevatedButton(
                      onPressed: () {

                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.yellow,
                        padding: const EdgeInsets.all(10),
                      ),
                      child: const SizedBox(
                        width: 40,
                        height: 40,
                      ),
                    ),
                  ),
                  ClipOval(
                    child: ElevatedButton(
                      onPressed: () {

                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.purple,
                        padding: const EdgeInsets.all(10),
                      ),
                      child: const SizedBox(
                        width: 40,
                        height: 40,
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
          const SizedBox(height: 20),
          SizedBox(
            width: MediaQuery.of(context).size.width,
            height: 70,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                  child: ElevatedButton(
                    onPressed: () {
                      // Action lorsque le bouton "Rechercher" est cliqué
                    },
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
                    child: const Text(
                      "Rechercher",
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      )
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}