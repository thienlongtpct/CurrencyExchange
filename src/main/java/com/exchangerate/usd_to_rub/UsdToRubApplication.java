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
    @GetMapping("/usd")
    public String usd(@RequestParam(value = "city") String city) throws ParserConfigurationException, IOException, SAXException {
        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
        DocumentBuilder db = dbf.newDocumentBuilder();
        String url;
        if (city.equals("saint"))
            url = "https://informer.kovalut.ru/webmaster/xml-table.php?kod=7801";
        else
            url = "https://informer.kovalut.ru/webmaster/xml-table.php?kod=7701";

        Document doc = db.parse(new URL(url).openStream());

        Element actual = (Element)doc.getElementsByTagName("Actual_Rates").item(0);
        NodeList bankListActual = actual.getElementsByTagName("Bank");

        StringBuilder allInfo = new StringBuilder();
        for (int i = 0; i < bankListActual.getLength(); ++i) {
            Element bank = (Element)bankListActual.item(i);
            String bankInfo = "";

            if (bank.getNodeType() == Node.ELEMENT_NODE) {
                bankInfo += preprocess(bank.getElementsByTagName("Name").item(0).getTextContent())+';';
                bankInfo += bank.getElementsByTagName("Url").item(0).getTextContent()+';';
                Element usd = (Element)bank.getElementsByTagName("USD").item(0);
                bankInfo += usd.getElementsByTagName("Sell").item(0).getTextContent()+';';
                bankInfo += usd.getElementsByTagName("Buy").item(0).getTextContent()+';';
                bankInfo += "actual"+';';
                bankInfo = bankInfo.replace("\n", "");
                allInfo.append(bankInfo);
                System.out.println(bankInfo);
            }
        }

        Element nonActual = (Element)doc.getElementsByTagName("Not_Actual_Rates").item(0);
        NodeList bankListNonActual = nonActual.getElementsByTagName("Bank");

        for (int i = 0; i < bankListNonActual.getLength(); ++i) {
            Element bank = (Element)bankListNonActual.item(i);
            String bankInfo = "";

            if (bank.getNodeType() == Node.ELEMENT_NODE) {
                bankInfo += preprocess(bank.getElementsByTagName("Name").item(0).getTextContent())+';';
                bankInfo += bank.getElementsByTagName("Url").item(0).getTextContent()+';';
                Element usd = (Element)bank.getElementsByTagName("USD").item(0);
                bankInfo += usd.getElementsByTagName("Sell").item(0).getTextContent()+';';
                bankInfo += usd.getElementsByTagName("Buy").item(0).getTextContent()+';';
                bankInfo += "non_actual"+';';
                bankInfo = bankInfo.replace("\n", "");
                allInfo.append(bankInfo);
                System.out.println(bankInfo);
            }
        }

        return allInfo.toString();
    }

    @GetMapping("/eur")
    public String eur(@RequestParam(value = "city") String city) throws ParserConfigurationException, IOException, SAXException {
        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
        DocumentBuilder db = dbf.newDocumentBuilder();
        String url;
        if (city.equals("saint"))
            url = "https://informer.kovalut.ru/webmaster/xml-table.php?kod=7801";
        else
            url = "https://informer.kovalut.ru/webmaster/xml-table.php?kod=7701";

        Document doc = db.parse(new URL(url).openStream());

        Element actual = (Element)doc.getElementsByTagName("Actual_Rates").item(0);
        NodeList bankListActual = actual.getElementsByTagName("Bank");

        StringBuilder allInfo = new StringBuilder();
        for (int i = 0; i < bankListActual.getLength(); ++i) {
            Element bank = (Element)bankListActual.item(i);
            String bankInfo = "";

            if (bank.getNodeType() == Node.ELEMENT_NODE) {
                bankInfo += preprocess(bank.getElementsByTagName("Name").item(0).getTextContent())+';';
                bankInfo += bank.getElementsByTagName("Url").item(0).getTextContent()+';';
                Element usd = (Element)bank.getElementsByTagName("EUR").item(0);
                bankInfo += usd.getElementsByTagName("Sell").item(0).getTextContent()+';';
                bankInfo += usd.getElementsByTagName("Buy").item(0).getTextContent()+';';
                bankInfo += "actual"+';';
                bankInfo = bankInfo.replace("\n", "");
                allInfo.append(bankInfo);
                System.out.println(bankInfo);
            }
        }

        Element nonActual = (Element)doc.getElementsByTagName("Not_Actual_Rates").item(0);
        NodeList bankListNonActual = nonActual.getElementsByTagName("Bank");

        for (int i = 0; i < bankListNonActual.getLength(); ++i) {
            Element bank = (Element)bankListNonActual.item(i);
            String bankInfo = "";

            if (bank.getNodeType() == Node.ELEMENT_NODE) {
                bankInfo += preprocess(bank.getElementsByTagName("Name").item(0).getTextContent())+';';
                bankInfo += bank.getElementsByTagName("Url").item(0).getTextContent()+';';
                Element usd = (Element)bank.getElementsByTagName("EUR").item(0);
                bankInfo += usd.getElementsByTagName("Sell").item(0).getTextContent()+';';
                bankInfo += usd.getElementsByTagName("Buy").item(0).getTextContent()+';';
                bankInfo += "non_actual"+';';
                bankInfo = bankInfo.replace("\n", "");
                allInfo.append(bankInfo);
                System.out.println(bankInfo);
            }
        }

        return allInfo.toString();
    }
}