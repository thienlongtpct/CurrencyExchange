package com.exchangerate.usd_to_rub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import java.util.*;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.io.IOException;
import java.net.URL;

@SpringBootApplication
@RestController
@CrossOrigin
public class UsdToRubApplication {

    public static void main(String[] args) {
        SpringApplication.run(UsdToRubApplication.class, args);
    }
    String preprocess(String s) {
        s = s.replaceAll("[^a-zA-Zа-яА-Я0-9 ]", "");
        return s;
    }
    @GetMapping("/readValue")
    public String readValue() throws ParserConfigurationException, IOException, SAXException {
        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
        DocumentBuilder db = dbf.newDocumentBuilder();
        String url = "https://informer.kovalut.ru/webmaster/xml-table.php?kod=7801";
        Document doc = db.parse(new URL(url).openStream());

        NodeList bankList = doc.getElementsByTagName("Bank");
        StringBuilder allInfo = new StringBuilder();
        for (int i = 0; i < bankList.getLength(); ++i) {
            Node bank = bankList.item(i);
            String bankInfo = "";

            if (bank.getNodeType() == Node.ELEMENT_NODE) {
                Element bankElement = (Element)bank;
                bankInfo += preprocess(bankElement.getElementsByTagName("Name").item(0).getTextContent())+';';
                Element usd = (Element)bankElement.getElementsByTagName("USD").item(0);
                bankInfo += usd.getElementsByTagName("Sell").item(0).getTextContent()+';';
                bankInfo += usd.getElementsByTagName("Buy").item(0).getTextContent()+';';
                bankInfo = bankInfo.replace("\n", "");
                allInfo.append(bankInfo);
            }
        }

        return allInfo.toString();
    }
}