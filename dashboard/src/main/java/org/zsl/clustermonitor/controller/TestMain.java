package org.zsl.clustermonitor.controller;

import com.google.common.base.Function;
import com.google.common.collect.*;
import org.springframework.jca.cci.object.MappingRecordOperation;
import org.zsl.clustermonitor.domain.Node;
import org.zsl.clustermonitor.helper.Protocol;

import java.util.*;

/**
 * TODO description
 * Created by liusz on 2014/12/24-22:38
 */
public class TestMain {

    public static void main(String[] args) {


        //List<Node> nodes = new ArrayList<>();
        Set<Node> nodes = new HashSet<>();
        Node node = new Node("Promotion-Engine","127.0.0.1",8080, Protocol.JMX);
//        Node node = new Node("Promotion-Engine","127.0.0.1",8080, Protocol.JMX);
//
//        Node node = new Node("Promotion-Engine","127.0.0.1",8080, Protocol.JMX);
//
//        Node node = new Node("Promotion-Engine","127.0.0.1",8080, Protocol.JMX);
//
//        Node node = new Node("Promotion-Engine","127.0.0.1",8080, Protocol.JMX);

        nodes.add(new Node("Promotion-Engine","127.0.0.1",8080, Protocol.JMX));
        nodes.add(new Node("Union","127.0.0.1",8080, Protocol.JMX));
        nodes.add(new Node("Promotion-Cahce","127.0.0.1",8080, Protocol.JMX));
        nodes.add(new Node("Promotion-Cache1","127.0.0.1",8080, Protocol.JMX));
        nodes.add(new Node("Union-Web","127.0.0.1",8080, Protocol.JMX));
        nodes.add(new Node("Promotion-Engine2","127.0.0.2",8081, Protocol.Jolokia));

//        ImmutableMap<String, Node> map = Maps.uniqueIndex(nodes, new Function<Node, String>() {
//            @Override public String apply(Node input) {
//                return input.getSystem();
//            }
//        });


//        ImmutableMap<Node, String> map = Maps.toMap(nodes, new Function<Node, String>() {
//            @Override public String apply(Node input) {
//                return input.getSystem();
//            }
//        });

        Map<Node, Object> map = Maps.asMap(nodes, new Function<Node, Object>() {
            @Override public Object apply(Node input) {
                return input.getSystem();
            }
        });

        System.out.println(map);

        System.out.println(map.get("Union-Web"));

        nodes.add(new Node("Promotion-Engine4","127.0.0.2",8081, Protocol.Jolokia));


        System.out.println(map.get("Promotion-Engine4"));

        System.out.println(map);
//        Multimaps.invert

        List<String> list = new ArrayList<>();
        list.add("1");

        final List<Integer> first  = Lists.newArrayList(1, 2, 3);
        final List<Integer> second = Lists.newArrayList(4, 5, 6);
        final List<Integer> third  = Lists.newArrayList(7, 8, 9);
        final Iterable<Integer> all =
                Iterables.unmodifiableIterable(
                        Iterables.concat(first, second, third));
        System.out.println(all);
        third.add(9999999);
        System.out.println(all);




    }
}
