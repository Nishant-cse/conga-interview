public class AccountDetailsController {
    @AuraEnabled(cacheable= true)
    public static Map<String, List<Contact>> getRelatedContacts(String parentId){
        //Map for grouping data on bases on their titile
        Map<String, List<Contact>> title2ContactsMap= new Map<String, List<Contact>>();
        for(Contact con : [Select Id, LastName, Title from contact where accountId=: parentId AND Title IN ('Customer Success', 'Application Developer')]){
            String key= (con.Title).toLowerCase();
            if(!title2ContactsMap.containsKey(key))
                title2ContactsMap.put(key, new List<Contact>());
            title2ContactsMap.get(key).add(con);
        }
        return title2ContactsMap.size() > 0 ? title2ContactsMap : null;
    }
}