import 'package:flutter/material.dart';

class MySearchDelegate extends SearchDelegate {
  List<String> searchTerms = [
    'Chaise',
    'Table',
    'Armoire',
    'Bureau',
    'Chaise en bois',
    'Table en bois',
  ];
  @override
  List<Widget> buildActions(BuildContext context) {
    return[
      IconButton(
        icon: const Icon(Icons.clear),
        onPressed: () {
          query = '';
        },
      ),
    ];
  }

  @override
  Widget buildLeading(BuildContext context) {
    return IconButton(
      icon: const Icon(Icons.arrow_back),
      onPressed:() {
        close(context, null);
      },
    );
  }

  @override
  Widget buildResults(BuildContext context) {
    List<String> matchQuery = [];
    for (var meuble in searchTerms) {
      if (meuble.toLowerCase().contains(query.toLowerCase())) {
        matchQuery.add(meuble);
      }
    }
    return ListView.builder(
      itemCount: matchQuery.length,
      itemBuilder: (context, index) {
        var result = matchQuery[index];
        return ListTile(
          title: Text(result),
        );
      },
    );
  }

  @override
  Widget buildSuggestions(BuildContext context) {
    List<String> matchQuery = [];
    for (var meuble in searchTerms) {
      if (meuble.toLowerCase().contains(query.toLowerCase())) {
        matchQuery.add(meuble);
      }
    }
    return ListView.builder(
      itemCount: matchQuery.length,
      itemBuilder: (context, index) {
        var result = matchQuery[index];
        return ListTile(
          title: Text(result),
        );
      },
    );
  }
}