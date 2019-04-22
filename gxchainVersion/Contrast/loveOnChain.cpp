#include <graphenelib/system.h>
#include <graphenelib/contract.hpp>
#include <graphenelib/dispatcher.hpp>
#include <graphenelib/multi_index.hpp>
#include <graphenelib/print.hpp>
#include <graphenelib/types.h>
#include <graphenelib/global.h>
#include <graphenelib/crypto.h>

#include<cmath>

using namespace graphene;

// static const uint64_t redpacket_asset_id = 1;//GXS

class loveOnChain : public contract
{
  public:
    helloworld(uint64_t id)
        : contract(id)
        , packets(_self, _self)
        // , records(_self, _self)
    {
    }

    // @abi action
    // @abi payable
    void send(std::string pubkey, std::string words)
    {
        uint64_t owner = get_trx_sender();

        auto packet_it = packets.find(owner);
        graphene_assert(packet_it == packets.end(), "already has one packet");

        // if(packet_it == packets.end()){

            packets.emplace(owner, [&](auto &o) {
                o.issuer = owner;
                o.pub_key = pubkey;
                o.date_time = get_head_block_time();
                o.words.emplace_back(words);
            });
        // }
        
        // else{
        //     packets.emplace(owner, [&](auto &o) {
        //         o.date_time.emplace_back(get_head_block_time());
        //         o.words.emplace_back(words);
        //     });
        // }
    }

   

    /// @abi action
    void get(std::string find_id)
    {
        //get the package of find
        int64_t issuer_id = get_account_id(find_id.c_str(), find_id.size());
        graphene_assert(issuer_id >= 0, "invalid account_name id");
        auto packet_iter_finder = packets.find(issuer_id);
        graphene_assert(packet_iter_finder != packets.end(), "no packet");
        
        // packet_iter_finder->time;
        // packet_iter_finder->words;
        
        //get the package of owner
        uint64_t owner = get_trx_sender();
        auto packet_iter_owner = packets.find(owner);
        graphene_assert(packet_iter_owner != packets.end(), "no packet");
        
        // packet_iter_owner->time;
        // packet_iter_owner->words;
        
    }

  private:
    //@abi table packet i64
    struct packet {
        uint64_t                issuer;
        std::string             pub_key;
        // vector<int64_t>         subpackets;
        int64_t                 date_time;
        vector<std::string>     words;

        int64_t primary_key() const { return date_time; }

        GRAPHENE_SERIALIZE(packet, (issuer)(pub_key)(date_time)(words))
    };
    typedef graphene::multi_index<N(packet), packet> packet_index;
    packet_index            packets;
};

GRAPHENE_ABI(helloworld, (send)(get))
